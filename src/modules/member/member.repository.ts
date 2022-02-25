import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { NewMemberDao } from "./interfaces/new-member.dao";
import { UpdateMemberDao } from "./interfaces/update-member.dao";

import { Member } from "./member.entity";
// import { Gender } from "../boards/types/gender.enum";

@Injectable()
@EntityRepository(Member)
export class MemberRepository extends Repository<Member> {

    async findByCode(memberCode: string){
        return await this.findOne({ where: { memberCode } });
    }

    async findByUsername(username: string){
        return await this.findOne({ where: { username } });
    }

    async saveMember(memberData: NewMemberDao): Promise<Member> {
        const {
            firstName,
            lastName,
            memberCode,
            username,
            password,
            joinedAt
        } = memberData;

        const newMember = new Member();

        newMember.firstName     = firstName;
        newMember.lastName      = lastName;
        newMember.memberCode    = memberCode;
        newMember.username      = username;
        newMember.password      = password;
        newMember.joinedAt      = joinedAt;
        
        return await this.save(newMember);
    }

    async updateMember(
        member:Member, 
        updateMemberData: UpdateMemberDao
    ): Promise<any>{
        const {
            firstName,
            lastName,
            password,
            bio,
            displayName
        }= updateMemberData;
       
        const beforeUpdate = {...member};

        member.firstName = firstName;
        member.lastName = lastName;
        member.bio = bio;
        member.password = password;
        member.displayName = displayName;

        const result = await this.save(member);

        let memberCode = member.memberCode;
        const updatedResource = await this.findByCode(memberCode);

        if(JSON.stringify(beforeUpdate) === JSON.stringify(updatedResource)) {
            return false;
        };
        return true;

    }
}