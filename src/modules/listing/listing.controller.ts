import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

import { Listing } from './listing.entity';
import { ListingService } from './listing.service';
import { ListingIdDto } from './dto/list-id.dto'

@Controller('api/listings')
export class ListingController {
    constructor(private readonly listingService: ListingService) {}

  @Get()
  async getAll(): Promise<Listing[]> {
    return await this.listingService.findAllCategories();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Listing> {
    return await this.listingService.findOneListing(id);
  }

  @Post()
  async create(@Body() data: CreateListDto): Promise<Listing> {
    return await this.listingService.createListing(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateListDto): Promise<Listing> {
    return await this.listingService.updateListing(id, data);
  }

  @Delete()
  async delete(@Body() data: ListingIdDto): Promise<any> {
    return await this.listingService.deleteListing(data);
  }
}


//to-do: 

// * add jwt auth middleware
// * role base authorization
// * response