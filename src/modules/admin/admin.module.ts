import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { RoleService } from '../role/role.service';
import { RoleRepository } from '../role/role.repository';
import { PermissionRepository } from '../permission/permission.repository';
import { PermissionService } from '../permission/permission.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AdminRepository,
            RoleRepository,
            PermissionRepository
        ]),
    ],
    providers: [
        AdminService,
        RoleService,
        PermissionService
    ],
    controllers: [AdminController]
})
export class AdminModule {}
