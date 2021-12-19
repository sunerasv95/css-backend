import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        PermissionRepository
    ])],
    providers: [PermissionService]
})
export class PermissionModule {}
