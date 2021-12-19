import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PermissionService } from '../permission/permission.service';
import { PermissionRepository } from '../permission/permission.repository';

@Module({
    imports: [TypeOrmModule.forFeature([
        RoleRepository,
        PermissionRepository
    ])],
    providers: [RoleService, PermissionService],
    controllers: [RoleController]
})
export class RoleModule {}
