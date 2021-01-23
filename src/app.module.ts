import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { CategoryModule } from './modules/category/category.module';
import { ListingModule } from './modules/listing/listing.module';
import { BrandModule } from './modules/brand/brand.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { TypeOrmConfigService } from './config/db/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass : TypeOrmConfigService,
    }),
    EncryptionModule,
    AuthModule,
    CategoryModule,
    ListingModule,
    BrandModule,
    UserModule,
  ],
})
export class AppModule {}
