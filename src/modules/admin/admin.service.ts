import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getCurrentTimestamp } from "src/common/helpers";
import { RoleService } from "../role/role.service";
import { Admin } from "./admin.entity";
import { AdminRepository } from "./admin.repository";
import { CreateAdminDto } from "./interfaces/create-admin.dto";
import { NewAdminDao } from "./interfaces/new-admin.dao";
import { UpdateAdminDto } from "./interfaces/update-admin.dto";
import { UpdatedAdminDao } from "./interfaces/updated-admin.dao";

export class AdminService {

    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: AdminRepository,
        private readonly roleService: RoleService
    ){}

    async getAllAdmins(): Promise<Admin[]>{
        return await this.adminRepository.find();
    }

    async findAdminByCode(adminCode: string): Promise<Admin>{
        const admin = await this.adminRepository.findOne({ where: { adminCode }});
        if(!admin){
            throw new NotFoundException('User is not exists!');
        } 
        return admin;
    }

    async createAdminUser(reqData: CreateAdminDto){
        let adminData: NewAdminDao = {};

        const {
            name,
            username,
            password,
            roleId
        } = reqData;

        const role = await this.roleService.findRole(roleId);

        adminData.fullName = name;
        adminData.username = username;
        adminData.password = password;
        adminData.adminCode = this.generateAdminCode();
        adminData.isActive = 1;
        adminData.isBlocked = 0;
        adminData.isDeleted = 0;
        adminData.role = role;

        return await this.adminRepository.createAdmin(adminData);
    }

    async updateAdminUser(adminCode: string, reqData: UpdateAdminDto){
        let updateData: UpdatedAdminDao = {};
        const {
            name,
            password,
            roleId
        } = reqData;

        const updateAdmin = await this.findAdminByCode(adminCode);

        if(name) updateData.fullName = name;
        if(password) updateData.password = password;
        if(roleId) updateData.role = await this.roleService.findRole(roleId);

        return await this.adminRepository.updateAdmin(updateAdmin, updateData);
    }


    async blockAdminUser(adminCode: string){
      
        const updateAdmin = await this.findAdminByCode(adminCode);

        return await this.adminRepository.updateBlockedStatus(updateAdmin, 1);
    }

    private generateAdminCode (): string {
        let postFix = getCurrentTimestamp().toString();
        postFix = postFix.slice(5, 12);
        return "AFL"+ postFix;
    }
}