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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ListingRepository, 
      CategoryRepository,
      MemberRepository,
      BrandRepository,
      PricingOptionRepository
    ]),
  ],
  controllers: [ListingController],
  providers: [ListingService]
})
export class ListingModule {}
