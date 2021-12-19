import {
	HttpException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

import { Category } from "./category.entity";
import { CreateCatDto } from "./dto/create-category.dto";
import { UpdateCatDto } from "./dto/update-category.dto";

@Injectable()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
	async findBySlug(categorySlug: string) {
		return await this.findOne({ categorySlug });
	}

	async findParent(id: number) {
		return await this.findOne({ id, isParent: 1 });
	}

	async createCategory(data: CreateCatDto): Promise<Category> {
		const { categoryName, parentId, isParent, parent, isActive } = data;

		const entity = new Category();

		entity.categoryName = categoryName;
		entity.isParent = isParent;
		entity.parent = parent;
		entity.isActive = isActive;

		return await this.save(entity);
	}

	async updateCategory(updateData: UpdateCatDto): Promise<Category> {
		return await this.save(updateData);
	}

	// async deleteExisting(id: number): Promise<any> {
	// 	try {
	// 		let result = await this.softDelete({ id });

	// 		if (result.affected == 0) {
	// 			throw new NotFoundException("Category couldn't be found");
	// 		} else {
	// 			await this.update({ id }, { isDeleted: 1 });
	// 			return { deleted: true };
	// 		}
	// 	} catch (error) {
	// 		throw new InternalServerErrorException(error);
	// 	}
	// }

	async softDeleteCategory(id: number) {
		return await this.softDelete({ id });
	}

	async updateIsDeleted(id: number) {
		return await this.update({ id }, { isDeleted: 1 });
	}
}
