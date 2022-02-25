import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin.dto";

// class AditionalAdminUpdateInfo {
    
//     blocked?: boolean;

//     active?: boolean;

// }

// export class UpdateAdminDto extends IntersectionType(
//     CreateAdminDto,
//     AditionalAdminUpdateInfo
// ) {}


export class UpdateAdminDto extends OmitType(
    CreateAdminDto,
    ['username'] as const
) {}


