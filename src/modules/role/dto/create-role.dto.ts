import { Permission } from "src/modules/permission/permission.entity"

export class CreateRoleDto {
    
    id: number

    roleName: string;

    roleCode: string;

    isActive: number;

    permissions: number[];
}