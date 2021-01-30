import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { CategoryModule } from './modules/category/category.module';
import { ListingModule } from './modules/listing/listing.module';
import { BrandModule } from './modules/brand/brand.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { TypeOrmConfigService } from './config/db/typeorm-config.service';
import { RolesGuard } from './modules/role/guards/roles.guard';
import { MemberService } from './modules/member/member.service';
import { MemberController } from './modules/member/member.controller';
import { MemberModule } from './modules/member/member.module';

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
    MemberModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard
  //   },
  //   MemberService
  // ],
  // controllers: [MemberController]
})
export class AppModule {}
