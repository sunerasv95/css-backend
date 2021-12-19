import { Injectable } from "@nestjs/common";
import { getCurrentTimestamp } from "src/common/helpers";
import { EntityRepository, Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";

@Injectable()
@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

    async getAll(){
        return await this.find();
    }

    async findByCode(roleCode: string){
        return await this.findOne({ where: { roleCode }});
    }

    async saveRole(createRoleDto: CreateRoleDto){
        const { 
            roleCode,
            roleName
        } = createRoleDto;
        const newRole = new Role();

        newRole.roleCode = roleCode;
        newRole.roleName = roleName;
        newRole.isActive = 1;
        newRole.isDeleted = 0;

        return await this.save(newRole);
    }
}