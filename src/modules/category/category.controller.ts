import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCatDto } from './dto/create-category.dto';
import { CatIdDto } from './dto/category-id.dto';
import { UpdateCatDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.findAllCategories();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.findOneCategory(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() catData: CreateCatDto): Promise<Category> {
    return await this.categoryService.createCategory(catData);
  }

  @Patch(':id')
  async update(@Param('id') id: CatIdDto, @Body() updateData: UpdateCatDto): Promise<Category> {
    return await this.categoryService.updateCategory(id, updateData);
  }

  @Delete()
  async delete(@Body() data: CatIdDto): Promise<any> {
    return await this.categoryService.deleteCategory(data);
  }
}
