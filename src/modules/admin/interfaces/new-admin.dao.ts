import { Role } from "src/modules/role/role.entity";

export interface NewAdminDao {

    fullName?: string;

    username?: string;

    adminCode?: string;

    password?: string;

    isBlocked?: number;

    isActive?: number;

    isDeleted?: number;

    role?: Role;
}