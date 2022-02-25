import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { encryptPassword, getCurrentTimestamp } from "src/common/helpers";
import { UserRepository } from "../user/user.repository";
import { NewMemberDao } from "./interfaces/new-member.dao";
import { RegisterMemberDto } from "./interfaces/register-member.dto";
import { UpdateMemberDao } from "./interfaces/update-member.dao";
import { UpdateMemberDto } from "./interfaces/update-member.dto";
import { Member } from "./member.entity";
import { MemberRepository } from "./member.repository";

@Injectable()
export class MemberService {
	constructor(
		private readonly memberRepository: MemberRepository,
		private readonly userRepository: UserRepository
	) {}

	async getAllMembers(): Promise<Member[]>{
		return await this.memberRepository.find();
	}

	async findMemberByCode(memberCode: string): Promise<Member>{
		const member = await this.memberRepository.findByCode(memberCode);
		if(!member){
            throw new NotFoundException('Member is not exists!');
        } 
        return member;
	}

	async registerMember(reqData: RegisterMemberDto): Promise<any> {
		let newMemberData: NewMemberDao = {};
		const { 
			fname,
			lname,
			username,
			password,
		} = reqData;

		const member = await this.memberRepository.findByUsername(username);
		if(member) throw new HttpException('Username already exists!', HttpStatus.BAD_REQUEST);

		newMemberData.firstName 	= fname;
		newMemberData.lastName 		= lname;
		newMemberData.memberCode 	= await this.generateMemberCode();
		newMemberData.username 		= username;
		newMemberData.password 		= await encryptPassword(password);
		newMemberData.joinedAt 		= new Date();

        return await this.memberRepository.saveMember(newMemberData);
		
	}

	async updateMember(memberCode: string, updateData: UpdateMemberDto): Promise<any>{
		//console.log("data", updateData);
		
		let updateMemberData: UpdateMemberDao = {};
		const {
			fname,
			lname,
			username,
			password,
			displayName,
			memberDescription
		} = updateData;

		const member = await this.findMemberByCode(memberCode);

		if(fname) updateMemberData.firstName 			= fname;
		if(lname) updateMemberData.lastName 			= lname;
		if(username) updateMemberData.username 			= username;
		if(password) updateMemberData.password			= password;
		if(memberDescription) updateMemberData.bio		= memberDescription;
		if(displayName) updateMemberData.displayName	= displayName;
		
		const result = await this.memberRepository.updateMember(member, updateMemberData);
		if(result) return { updated: true }
		return { updated: false }
		//return await this.memberRepository.updateMember(member, updateMemberData);
		

	}

	async generateMemberCode (): Promise<string> {
        let postFix = getCurrentTimestamp().toString();
        postFix = postFix.slice(5, 12);
        return await "CME"+ postFix;
    }
}
