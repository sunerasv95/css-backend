import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import User from "../user/user.entity";
import { UserRepository } from "../user/user.repository";
import { MemberRegisterDto } from "./dto/member-register.dto";
import { Member } from "./member.entity";
import { MemberRepository } from "./member.repository";

@Injectable()
export class MemberService {
	constructor(
		private readonly memberRepository: MemberRepository,
		private readonly userRepository: UserRepository
	) {}

	async registerMember(memberData: MemberRegisterDto): Promise<any> {
		const { firstName, lastName, gender, ...data } = memberData;

        const newUser = await this.userRepository.createNewUser(data);
		if (newUser) {
			return await this.memberRepository.saveMember(memberData, newUser);
		}
	}
}
