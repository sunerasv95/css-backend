import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { slugify } from './../../common/helpers';
import { Brand } from './brand.entity';
import { BrandIdDto } from './dto/brand-id.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

const defaultLogo = "https://picsum.photos/200/300";

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand) 
        private readonly brandRepository
    ){}

    async findAllBrands() : Promise<Brand[]> {
        return await this.brandRepository.find();
    }

    async findBrandById(id: number) : Promise<Brand> {
        const brand = await this.brandRepository.findOne({id});
        if(!brand){
            throw new NotFoundException('Brand is not exists!');
        } 
        return brand;
    }

    async createBrand(reqData: CreateBrandDto): Promise<any> {
		const slug = await slugify(reqData.brandName);

		//check brand name is exists
		const brand = await this.brandRepository.findBrandBySlug(slug);
		if (brand) throw new BadRequestException("Brand already exists!");

        return await this.brandRepository.createBrand(reqData);
    }

    async updateBrand(id: number, reqData: UpdateBrandDto): Promise<any> {
        let updateBrand: Brand;
        const {
            brandName,
            brandLogoImgUrl,
            isActive
        } = reqData;

		updateBrand = await this.findBrandById(id);

		if (brandName) {            
			const slug = await slugify(brandName);
			const updatedCategory = await this.brandRepository.findBySlug(slug);

			if (updatedCategory) {
                throw new BadRequestException("Brand name already exists!");
            }
			updateBrand.brandName = brandName;
		}
        if (brandLogoImgUrl) updateBrand.brandLogoImgUrl = brandLogoImgUrl;
		if (isActive !== undefined) updateBrand.isActive = isActive;

        return await this.brandRepository.updateBrand(updateBrand);
    }

    async deleteBrand(id: number): Promise<any> {
        const deletedBrand = await this.findBrandById(id);

        const result = await this.brandRepository.softDeleteBrand(id);

        if(result.raw.affectedRows > 0){
            const updatedResult = await this.brandRepository.updateIsDeleted(id);
            if(updatedResult.raw.affectedRows > 0){
                return { deleted: true };
            }
            return { deleted: false };
        }else{
            throw new HttpException("Something went wrong", 500);
        }
    }
}
