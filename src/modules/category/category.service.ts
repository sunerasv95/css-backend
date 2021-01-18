import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from './category.entity';
import { CreateCatDto } from './dto/create-category.dto';
import { CatIdDto } from './dto/category-id.dto';
import { UpdateCatDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) 
        private readonly categoryRepository
    ){}

    async findAllCategories() : Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findOneCategory(id: number) : Promise<Category> {
        const category = await this.categoryRepository.findOne(id);
        if(!category){
            throw new NotFoundException('Category couldn\'t be found');
        } 
        return category;
    }

    async createCategory(catData: CreateCatDto): Promise<Category>{
        return await this.categoryRepository.createNew(catData);
    }

    async updateCategory(id: CatIdDto, updateData: UpdateCatDto): Promise<Category>{
        return await this.categoryRepository.updateExisting(id, updateData);
    }

    async deleteCategory(data: CatIdDto): Promise<any> {
        return await this.categoryRepository.deleteExisting(data);
    }
}
