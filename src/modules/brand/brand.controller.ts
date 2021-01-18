import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Brand } from './brand.entity';
import { BrandService } from './brand.service';
import { BrandIdDto } from './dto/brand-id.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('api/brands')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

  @Get()
  async getAll(): Promise<Brand[]> {
    return await this.brandService.findAllBrands();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Brand> {
    return await this.brandService.findOneBrand(id);
  }

  @Post()
  async create(@Body() catData: CreateBrandDto): Promise<Brand> {
    return await this.brandService.createBrand(catData);
  }

  @Patch(':id')
  async update(@Param('id') id: BrandIdDto, @Body() updateData: UpdateBrandDto): Promise<Brand> {
    return await this.brandService.updateBrand(id, updateData);
  }

  @Delete()
  async delete(@Body() data: BrandIdDto): Promise<any> {
    return await this.brandService.deleteBrand(data);
  }
}
