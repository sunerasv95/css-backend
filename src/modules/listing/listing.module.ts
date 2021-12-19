import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListingRepository } from './listing.repository';
import { CategoryRepository } from './../category/category.repository';
import { CategoryModule } from './../category/category.module';
import { MemberRepository } from '../member/member.repository';
import { BrandRepository } from '../brand/brand.repository';
import { PricingOptionRepository } from '../pricing-option/pricing-option.repository';
import { CategoryService } from '../category/category.service';
import { BrandService } from '../brand/brand.service';
import { WaveService } from '../wave/wave.service';
import { MadeofService } from '../madeof/madeof.service';
import { FinTypeService } from '../fin-type/fin-type.service';
import { WaveRepository } from '../wave/wave.repository';
import { MadeofRepository } from '../madeof/madeof.repository';
import { FinTypeRepository } from '../fin-type/fin-type.repository';
import { BoardRepository } from '../board/board.repository';
import { BoardService } from '../board/board.service';
import { AccessoryService } from '../accessory/accessory.service';
import { AccessoryRepository } from '../accessory/accessory.respository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ListingRepository, 
      CategoryRepository,
      BrandRepository,
      WaveRepository,
      MadeofRepository,
      FinTypeRepository,
      BoardRepository,
      AccessoryRepository
    ]),
  ],
  controllers: [ListingController],
  providers: [
    ListingService, 
    CategoryService,
    BrandService,
    WaveService,
    MadeofService,
    FinTypeService,
    BoardService,
    AccessoryService
  ]
})
export class ListingModule {}
