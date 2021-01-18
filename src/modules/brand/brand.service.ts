import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { BrandIdDto } from './dto/brand-id.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand) 
        private readonly brandRepository
    ){}

    async findAllBrands() : Promise<Brand[]> {
        return await this.brandRepository.find();
    }

    async findOneBrand(id: number) : Promise<Brand> {
        const brand = await this.brandRepository.findOne(id);
        if(!brand){
            throw new NotFoundException('Brand couldn \'t be found');
        } 
        return brand;
    }

    async createBrand(brandData: CreateBrandDto): Promise<Brand> {
        return await this.brandRepository.createNew(brandData);
    }

    async updateBrand(id: BrandIdDto, updateData: UpdateBrandDto): Promise<Brand> {
        return await this.brandRepository.updateExisting(id, updateData);
    }

    async deleteBrand(data: BrandIdDto): Promise<any> {
        return await this.brandRepository.deleteExisting(data);
    }
}
