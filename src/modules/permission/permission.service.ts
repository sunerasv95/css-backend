import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./permission.entity";
import { PermissionRepository } from "./permission.repository";

@Injectable()
export class PermissionService {
    
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: PermissionRepository
    ){}

    async getAllPermissions(): Promise<Permission[]>{
        return await this.permissionRepository.getAll();
    }

    async findPermissionById(permissionId: number): Promise<Permission>{
        const permission = await this.permissionRepository.findById(permissionId);
        if(permission) return permission;
        throw new HttpException("Permission is not exists!", HttpStatus.NOT_FOUND);
    }

    async findPermissionBySlug(permissionSlug: string): Promise<Permission>{
        const permission = await this.permissionRepository.findBySlug(permissionSlug);
        if(permission) return permission;
        throw new HttpException("Permission is not exists!", HttpStatus.NOT_FOUND);
    }
}