import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {

    constructor(private readonly roleService: RoleService){}

    @Get()
    async getAll(): Promise<Role[]>{
        return await this.roleService.getAllRoles();
    }

    @Get()
    async getOne(
        @Param('id') roleCode: string
    ): Promise<Role>{
        return this.roleService.findRole(roleCode);
    }

    @Post()
    async create(
        @Body() createRoleDto: CreateRoleDto
    ): Promise<any>{
        return await this.roleService.createRole(createRoleDto);
    }
}
