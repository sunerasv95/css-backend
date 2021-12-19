import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Permission } from "./permission.entity";

@Injectable()
@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {

    async getAll(): Promise<Permission[]>{
        return await this.find();
    }

    async findById(id: number): Promise<Permission>{
        return await this.findOne({ where: { id }});
    }

    async findBySlug(permissionSlug: string): Promise<Permission>{
        return await this.findOne({ where: { permissionSlug }});
    }

}
