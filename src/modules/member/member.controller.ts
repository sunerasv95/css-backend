import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RegisterMemberDto } from './interfaces/register-member.dto';
import { UpdateMemberDto } from './interfaces/update-member.dto';
import { Member } from './member.entity';
import { MemberService } from './member.service';

@Controller('members')
export class MemberController {
    
    constructor(private readonly memberService: MemberService) {}

    @Get()
    async getAll(): Promise<Member[]>{
        return await this.memberService.getAllMembers();
    }

    @Get(':code')
    async getOne(
        @Param('code') memberCode: string
    ): Promise<Member>{
        return await this.memberService.findMemberByCode(memberCode);
    }

    @Post()
    async create(
        @Body() memberData: RegisterMemberDto
    ): Promise<any>{
        return await this.memberService.registerMember(memberData);
    }

    @Put(':code')
    async update(
        @Param('code') memberCode: string,
        @Body() updateData: UpdateMemberDto
    ): Promise<any>{
        return await this.memberService.updateMember(memberCode, updateData);
    }
}
