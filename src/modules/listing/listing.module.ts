import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListingRepository } from './listing.repository';
import { CategoryRepository } from 'src/modules/category/category.repository';
import { CategoryModule } from 'src/modules/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ListingRepository, 
      CategoryRepository
    ]),
  ],
  controllers: [ListingController],
  providers: [ListingService]
})
export class ListingModule {}
