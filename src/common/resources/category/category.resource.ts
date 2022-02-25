import { Exclude } from 'class-transformer';
import { Category } from '../../../modules/category/category.entity';

export class CategoryResource {
    id: number;
    categoryName: string;
    categorySlug: string;
    isActive: number;
    isParent: number;
    createdAt: Date;
    updatedAt: Date;

    @Exclude()
    isDeleted: number;
    
    @Exclude()
    deletedAt: Date;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}