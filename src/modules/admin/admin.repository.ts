import { EntityRepository, Repository } from "typeorm";
import { Admin } from "./admin.entity";
import { NewAdminDao } from "./interfaces/new-admin.dao";
import { UpdatedAdminDao } from "./interfaces/updated-admin.dao";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{

    async createAdmin(newData: NewAdminDao){
        const {
            fullName,
            adminCode,
            username,
            password,
            isBlocked,
            isActive,
            isDeleted,
            role
        } = newData;

        let newAdmin = new Admin();

        newAdmin.fullName = fullName;
        newAdmin.username = username;
        newAdmin.password = password;
        newAdmin.adminCode = adminCode;
        newAdmin.isBlocked = isBlocked;
        newAdmin.isActive = isActive;
        newAdmin.isDeleted = isDeleted;
        newAdmin.role = role;

        return await this.save(newAdmin);
    }

    async updateAdmin(updateAdmin: Admin, updateData: UpdatedAdminDao){
        console.log("repo", updateAdmin, updateData);
        
        const {
            fullName,
            password,
            role
        } = updateData;

        updateAdmin.fullName = fullName;
        updateAdmin.password = password;
        updateAdmin.role     = role;

        return await this.save(updateAdmin);
    }

    async updateBlockedStatus(updateAdmin:Admin, status: number){

        updateAdmin.isBlocked = status;

        return await this.save(updateAdmin);
    }
}