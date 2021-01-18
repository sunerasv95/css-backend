import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Category } from './category.entity';
import { CreateCatDto } from './dto/create-category.dto';
import { CatIdDto } from './dto/category-id.dto';
import { UpdateCatDto } from './dto/update-category.dto';

@Injectable()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createNew(catData: CreateCatDto): Promise<Category> {
    let parentId,
      parent = null;
    let isParent = 1;

    try {
      const entity = new Category();

      //find parent
      parentId = catData.parent;
      if (parentId !== 0) {
        parent = await this.findOne(parentId);
        isParent = 0;
      }

      entity.name = catData.name;
      entity.description = catData.description;
      entity.isParent = isParent;
      entity.parent = parent;
      entity.isActive = 1;

      return await this.save(entity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateExisting(
    id: number,
    updateData: UpdateCatDto,
  ): Promise<Category> {
    try {
      const updateEntity = await this.findOne(id);
      if (!updateEntity) {
        throw new NotFoundException("Category couldn\'t be found");
      }

      if (updateData.name) updateEntity.name = updateData.name;
      if (updateData.description)
        updateEntity.description = updateData.description;
      if (updateData.isParent) updateEntity.isParent = updateData.isParent;
      if (updateData.parent) updateEntity.parent = updateData.parent;
      if (updateData.active) updateEntity.isActive = updateData.active;

      await this.update({ id }, updateEntity);
      return updateEntity;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteExisting(data: CatIdDto): Promise<any> {
    try {
      let result = await this.softDelete({ id: data.categoryId });

      if (result.affected == 0) {
        throw new NotFoundException("Category couldn\'t be found");
      } else {
        await this.update({ id: data.categoryId }, { isDeleted: 1 });
        return { deleted: true };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
