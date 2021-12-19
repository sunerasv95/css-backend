import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import User from "../user/user.entity";
import { MemberRegisterDto } from "./dto/member-register.dto";

import { Member } from "./member.entity";
// import { Gender } from "../boards/types/gender.enum";

@Injectable()
@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {
    async saveMember(memberData: MemberRegisterDto, newUser): Promise<any> {
        const newMember = new Member();

        newMember.firstName = memberData.firstName;
        newMember.lastName = memberData.lastName;
        // newMember.gender = memberData.gender as Gender;
        newMember.joinedAt = new Date();
        newMember.user  = newUser;
        
        await this.save(newMember);
        return newMember;
    }
}