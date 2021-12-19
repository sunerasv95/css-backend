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
import { MemberModule } from './modules/member/member.module';
import { PricingOptionModule } from './modules/pricing-option/pricing-option.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
// import { BoardModule } from './modules/board/board.module';
import { BoardModule } from './modules/board/board.module';
import { WaveModule } from './modules/wave/wave.module';
import { MadeofModule } from './modules/madeof/madeof.module';
import { TradeTypesModule } from './modules/trade-type/trade-type.module';
import { FinTypeModule } from './modules/fin-type/fin-type.module';
import { AccessoryModule } from './modules/accessory/accessory.module';
import { AdminModule } from './modules/admin/admin.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';

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
    PricingOptionModule,
    FileUploadModule,
    BoardModule,
    WaveModule,
    MadeofModule,
    TradeTypesModule,
    FinTypeModule,
    AccessoryModule,
    AdminModule,
    RoleModule,
    PermissionModule,
    RoleModule,
    // BoardModule,
  ],
  controllers: [],
  providers: [],
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
