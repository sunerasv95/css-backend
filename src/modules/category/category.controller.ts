import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Res,
	UseFilters,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";
import { CreateCatDto } from "./dto/create-category.dto";
import { CatIdDto } from "./dto/category-id.dto";
import { UpdateCatDto } from "./dto/update-category.dto";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../role/decorators/roles.decorators";
import { Role } from "../role/types/roles.enums";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";
import { CategoryResource } from "../../common/resources/category/category.resource";
import { response, Response } from "express";
import { TransformInterceptor } from "src/common/interceptors/transaform.interceptor";

// @UseFilters(new HttpExceptionFilter())
@Controller("categories")
export class CategoryController {

	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	@UseInterceptors(ClassSerializerInterceptor)
	@UseInterceptors(TransformInterceptor)
	async getAll(): Promise<any> {
		return await this.categoryService.findAllCategories();
	}

	//@UseGuards(JwtAuthGuard)
	@Get(":id")
	@UseInterceptors(ClassSerializerInterceptor)
	@UseInterceptors(TransformInterceptor)
	@UseFilters(HttpExceptionFilter)
	async getOne(
		@Param("id") categoryId: number,
	): Promise<any> {
		return await this.categoryService.findCategoryById(categoryId);
	}

	//@UseGuards(JwtAuthGuard)
	@Post()
	@UseInterceptors(TransformInterceptor)
	@UseFilters(HttpExceptionFilter)
	async create(@Body() categoryData: CreateCatDto): Promise<Category> {
		return await this.categoryService.createCategory(categoryData);
	}

	@Patch(":id")
	@UseInterceptors(TransformInterceptor)
	@UseFilters(HttpExceptionFilter)
	async update(
		@Param("id") categoryId: number,
		@Body() updateCategoryData: UpdateCatDto
	): Promise<Category> {
		return await this.categoryService.updateCategory(
			categoryId,
			updateCategoryData
		);
	}

	@Delete(":id")
	@UseInterceptors(TransformInterceptor)
	@UseFilters(HttpExceptionFilter)
	async delete(@Param("id") categoryId: number): Promise<any> {
		return await this.categoryService.deleteCategory(categoryId);
	}
}
