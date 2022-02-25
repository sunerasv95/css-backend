import { Role } from "src/modules/role/role.entity"

export class CreateAdminDto {

    readonly name: string;

    readonly username: string;

    readonly password: string;

    readonly roleId: string;

}