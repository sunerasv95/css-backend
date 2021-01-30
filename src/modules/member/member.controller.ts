import { Body, Controller, Post } from '@nestjs/common';

import { MemberRegisterDto } from './dto/member-register.dto';
import { MemberService } from './member.service';

@Controller('api/member')
export class MemberController {
    
    constructor(private readonly memberService: MemberService) {}

    @Post()
    async create(
        @Body() memberData: MemberRegisterDto
    ): Promise<any>{
        return await this.memberService.registerMember(memberData);
    }
}
