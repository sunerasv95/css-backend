import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { Brand } from "./brand.entity";
import { BrandService } from "./brand.service";
import { BrandIdDto } from "./dto/brand-id.dto";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Controller("brands")
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	@Get()
	async getAll(): Promise<Brand[]> {
		return await this.brandService.findAllBrands();
	}

	@Get(":id")
	async getOne(@Param("id") id: number): Promise<Brand> {
		return await this.brandService.findBrandById(id);
	}

	//@UsePipes(new ValidationPipe({ transform: true }))
	@Post()
	async create(@Body() catData: CreateBrandDto): Promise<Brand> {
		return await this.brandService.createBrand(catData);
	}

	@Patch(":id")
	async update(
		@Param("id") id: number,
		@Body() updateData: UpdateBrandDto
	): Promise<Brand> {
		return await this.brandService.updateBrand(id, updateData);
	}

	@Delete(":id")
	async delete(@Param("id") id: number): Promise<any> {
		return await this.brandService.deleteBrand(id);
	}
}
