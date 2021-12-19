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

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository
	) {}

	async findAllCategories(): Promise<Category[]> {
		return await this.categoryRepository.find();
	}

	async findCategoryById(id: number): Promise<Category> {
		const category = await this.categoryRepository.findOne({ id });
		if (category) {
			return category;
		}
		throw new HttpException("Category is not exists!", HttpStatus.NOT_FOUND);
	}

	async createCategory(reqData: CreateCatDto): Promise<Category> {
		const { categoryName, parentId } = reqData;

		const slug = await slugify(categoryName);
		const category = await this.categoryRepository.findBySlug(slug);
		if (category) throw new BadRequestException("Category already exists!");

		if (parentId !== 0 && parentId !== undefined) {
			const parent = await this.categoryRepository.findParent(parentId);
			if (!parent) {
				throw new BadRequestException("Parent category is not exists!");
			}
			reqData.parent = parent;
			reqData.isParent = 0;
			reqData.isActive = 1;
		}
		if (parentId === 0 && parentId !== undefined) {
			reqData.parent = null;
			reqData.isParent = 1;
			reqData.isActive = 1;
		}

		return await this.categoryRepository.createCategory(reqData);
	}

	async updateCategory(id: number, reqData: UpdateCatDto): Promise<any> {
		const updateCategory = await this.findCategoryById(id);

		//update category name
		if (reqData.categoryName) {
			const slug = await slugify(reqData.categoryName);

			const updatedCategory = await this.categoryRepository.findBySlug(slug);
			if (updatedCategory)
				throw new BadRequestException("Category already exists!");

			updateCategory.categoryName = reqData.categoryName;
		}

		//update category parent
		if (reqData.parentId !== 0 && reqData.parentId !== undefined) {
			console.log("hit this too", reqData.parentId);

			const parent = await this.categoryRepository.findParent(reqData.parentId);
			if (!parent) {
				throw new BadRequestException("Parent category is not exists!");
			}
			if (id == parent.id) {
				throw new BadRequestException(
					"Same category cannot add as the parent category!"
				);
			}

			updateCategory.isParent = 0;
			updateCategory.parent = parent;
		}
		if (reqData.parentId === 0 && reqData.parentId !== undefined) {
			updateCategory.isParent = 0;
			updateCategory.parent = null;
		}
		if (reqData.isActive !== null && reqData.isActive !== undefined) {
			updateCategory.isActive = reqData.isActive;
		}

		return await this.categoryRepository.updateCategory(updateCategory);
	}

	async deleteCategory(id: number): Promise<any> {
		const category = await this.findCategoryById(id);

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
