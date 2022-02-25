import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        PermissionRepository
    ])],
    providers: [PermissionService],
    controllers: [PermissionController]
})
export class PermissionModule {}
