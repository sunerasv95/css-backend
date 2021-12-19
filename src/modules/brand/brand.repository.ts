import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { BrandIdDto } from './dto/brand-id.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {

  async findBrandBySlug(brandSlug: string) {
		return await this.findOne({ brandSlug });
	}

  async createBrand(data: CreateBrandDto): Promise<Brand> {
      const {
        brandName,
        brandLogoImgUrl,
        isActive
      } = data;

      const entity = new Brand();

      entity.brandName = brandName;
      entity.brandLogoImgUrl = brandLogoImgUrl;
      entity.isActive = isActive;

      return await this.save(entity);
  }

  async updateBrand(updateData: UpdateBrandDto){
    return await this.save(updateData);
  }

  async softDeleteBrand(id: number) {
    return await this.softDelete({ id });
  }

  async updateIsDeleted(id: number){
    return await this.update({ id }, { isDeleted: 1 });
  }

}
