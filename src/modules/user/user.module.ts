import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptionModule } from '../encryption/encryption.module';

import { UserController } from './user.controller';
import {UserRepository} from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    EncryptionModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
