import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Category } from "./category.entity";
import { CreateCatDto } from "./dto/create-category.dto";
import { UpdateCatDto } from "./dto/update-category.dto";
import { slugify } from "../../common/helpers";
import { CategoryResource } from "../../common/resources/category/category.resource";

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository
	) {}

	async findAllCategories(): Promise<CategoryResource[]> {
		let categories = await this.categoryRepository.find();
		if(categories){
			return categories.map(function(category){
				return new CategoryResource(category);
			});
		}
		return [];
	}

	async findCategoryById(id: number) : Promise<any> {
		console.log("find", id, typeof(id));
		
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (category) {
			return new CategoryResource(category);
		}
		throw new HttpException("Category is not exists!", HttpStatus.NOT_FOUND);
	}

	async createCategory(reqData: CreateCatDto): Promise<any> {
		const { categoryName, parentId } = reqData;

		const slug = await slugify(categoryName);
		const category = await this.categoryRepository.findBySlug(slug);
		if (category) throw new HttpException("Category already exists!", HttpStatus.BAD_REQUEST);

		if (parentId !== 0 && parentId !== undefined) {
			const parent = await this.categoryRepository.findParent(parentId);
			if (!parent) throw new HttpException("Parent category is not exists!", HttpStatus.BAD_REQUEST);

			reqData.parent = parent;
			reqData.isParent = 0;
			reqData.isActive = 1;
		}
		if (parentId === 0 && parentId !== undefined) {
			reqData.parent = null;
			reqData.isParent = 1;
			reqData.isActive = 1;
		}
		
		const categoryCreated = await this.categoryRepository.createCategory(reqData);
		if(categoryCreated) return { created : true }
		return { result : false }
	}

	async updateCategory(id: number, reqData: UpdateCatDto): Promise<any> {
		const category = await this.findCategoryById(id);
		const beforeUpdate = {...category};

		//update category name
		if (reqData.categoryName) {
			const slug = await slugify(reqData.categoryName);

			const updatedCategory = await this.categoryRepository.findBySlug(slug);
			if (updatedCategory && id === category.id){
				throw new HttpException("Category already exists!", HttpStatus.BAD_REQUEST);
			}
			category.categoryName = reqData.categoryName;
			category.categorySlug = slug;
		}

		//update category parent
		if (reqData.parentId !== 0 && reqData.parentId !== undefined) {
			console.log("hit this too", reqData.parentId);

			const parent = await this.categoryRepository.findParent(reqData.parentId);
			if (!parent) {
				throw new HttpException("Parent category is not exists!", HttpStatus.BAD_REQUEST);
			}
			if (id == parent.id) {
				throw new HttpException("Same category cannot add as the parent category!",HttpStatus.BAD_REQUEST);
			}
			category.isParent = 0;
			category.parent = parent;
		}
		if (reqData.parentId === 0 && reqData.parentId !== undefined) {
			category.isParent = 0;
			category.parent = null;
		}
		if (reqData.isActive !== null && reqData.isActive !== undefined) {
			category.isActive = reqData.isActive;
		}
		
		const updatedResource  = await this.categoryRepository.updateCategory(category);
		if(JSON.stringify(beforeUpdate) === JSON.stringify(updatedResource)) {
            return { updated : false };
        };
        return { updated : true };
	}

	async deleteCategory(id: number): Promise<any> {
		await this.findCategoryById(id);

		const result = await this.categoryRepository.softDeleteCategory(id);
		if (result.raw.affectedRows > 0) {
			const updatedResult = await this.categoryRepository.updateIsDeleted(id);
			if (updatedResult.raw.affectedRows > 0) {
				return { deleted: true };
			}
			return { deleted: false };
		} else {
			throw new HttpException("Something went wrong", 500);
		}
	}
}
