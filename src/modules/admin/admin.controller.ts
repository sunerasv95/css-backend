import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './interfaces/create-admin.dto';
import { UpdateAdminDto } from './interfaces/update-admin.dto';

@Controller('admins')
export class AdminController {
    constructor(private readonly adminService: AdminService){}

    @Get()
    async getAll(): Promise<Admin[]>{
        return await this.adminService.getAllAdmins();
    }

    @Get(':code')
    async getOne(
        @Param('code') adminCode: string
    ): Promise<Admin>{
        return await this.adminService.findAdminByCode(adminCode);
    }

    @Post()
    async createAdmin(
        @Body() createAdminDto: CreateAdminDto
    ){
        return await this.adminService.createAdminUser(createAdminDto);
    }

    @Put(':code')
    async updateAdmin(
        @Param('code') adminCode: string,
        @Body() updateAdminDto: UpdateAdminDto
    ){
        return await this.adminService.updateAdminUser(adminCode, updateAdminDto);
    }

    @Put('blockedUsers/:code')
    async blockAdmin(
        @Param('code') adminCode: string
    ){
        return await this.adminService.blockAdminUser(adminCode);
    }
}
