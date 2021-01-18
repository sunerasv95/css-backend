import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from './modules/category/category.module';
import { ListingModule } from './modules/listing/listing.module';
import { BrandModule } from './modules/brand/brand.module';
import { typeOrmConfig} from './config/database.config';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [dbConfiguration],
    // }),
    TypeOrmModule.forRoot(typeOrmConfig),
    CategoryModule,
    ListingModule,
    BrandModule,
  ],
})
export class AppModule {}
