import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from './modules/category/category.module';
import { ListingModule } from './modules/listing/listing.module';
import { BrandModule } from './modules/brand/brand.module';
import { typeOrmConfig} from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EncryptionModule } from './modules/encryption/encryption.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   load: [dbConfiguration],
    // }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    CategoryModule,
    ListingModule,
    BrandModule,
    UserModule,
    EncryptionModule,
  ],
})
export class AppModule {}
