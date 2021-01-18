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
  async createNew(catData: CreateBrandDto): Promise<Brand> {
    try {
      const entity = new Brand();

      entity.name = catData.name;
      entity.description = catData.description;
      entity.isActive = 1;

      return await this.save(entity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateExisting(id: number, updateData: UpdateBrandDto): Promise<Brand> {
    try {
      const updateEntity = await this.findOne(id);
      if (!updateEntity) {
        throw new NotFoundException("Brand couldn't be found");
      }

      if (updateData.name) updateEntity.name = updateData.name;
      if (updateData.description)
        updateEntity.description = updateData.description;
      if (updateData.active) updateEntity.isActive = updateData.active;

      await this.update({ id }, updateEntity);
      return updateEntity;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteExisting(data: BrandIdDto): Promise<any> {
    try {
      let result = await this.softDelete({ id: data.brandId });

      if (result.affected == 0) {
        throw new NotFoundException("Category couldn't be found");
      } else {
        await this.update({ id: data.brandId }, { isDeleted: 1 });
        return { deleted: true };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
