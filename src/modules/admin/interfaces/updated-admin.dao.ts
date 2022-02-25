import { Role } from "src/modules/role/role.entity";

export interface UpdatedAdminDao {

    fullName?: string;

    password?: string;

    role?: Role;
}