import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { throwError } from "rxjs";
import { getCurrentTimestamp } from "src/common/helpers";
import { getManager } from "typeorm";
import { Permission } from "../permission/permission.entity";
import { PermissionService } from "../permission/permission.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";
import { RoleRepository } from "./role.repository";

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: RoleRepository,
        private readonly permissionService: PermissionService
    ){}

    async getAllRoles(): Promise<Role[]>{
        return await this.roleRepository.getAll();
    }

    async findRole(roleCode: string): Promise<Role>{
        const role = await this.roleRepository.findByCode(roleCode);
        if(role) return role;
        throw new HttpException("Role is not found", HttpStatus.NOT_FOUND);
    }
    

    // async createRole(createRoleDto: CreateRoleDto): Promise<Role>{
    //     try {
    //         const {roleName} = createRoleDto;
    //         createRoleDto.roleCode = this.generateRoleCode();
    //         const role = await this.roleRepository.findOne({ where:{ roleName }});
    //         if(role) throw new HttpException("Role is already exists", HttpStatus.BAD_REQUEST);

    //         const savedRole = await this.roleRepository.saveRole(createRoleDto);
    //         return savedRole;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async createRole(createRoleDto: CreateRoleDto): Promise<any>{
        try {
            const {
                roleName,
                permissions
            } = createRoleDto;
            await getManager().transaction(async manager => {
                let permissionsToSave: Permission[] = [];

                for(let i=0; i < permissions.length; i++){
                    let pid = permissions[i];
                    const permission = await this.permissionService.findPermissionById(pid);
                    permissionsToSave.push(permission);
                }

                const newRole = new Role();

                newRole.roleCode = this.generateRoleCode();
                newRole.roleName = roleName;
                newRole.isActive = 1;
                newRole.isDeleted = 0;
                newRole.permissions = permissionsToSave;
                
               await manager.save(newRole);

            });
        } catch (error) {
            throw error;
        }

        return {created: true};
    }

    private generateRoleCode (): string {
        let postFix = getCurrentTimestamp().toString();
        postFix = postFix.slice(5, 12);
        return "ARM"+ postFix;
    }
}