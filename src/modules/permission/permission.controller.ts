import { Controller, Get } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionController {

    constructor(private readonly permissionService: PermissionService){}

    @Get()
    async getAll(): Promise<Permission[]>{
        return this.permissionService.getAllPermissions();
    }
}
