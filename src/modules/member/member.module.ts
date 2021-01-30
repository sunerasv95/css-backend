import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';

import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';

@Module({
    imports: [TypeOrmModule.forFeature([MemberRepository, UserRepository])],
    controllers: [MemberController],
    providers: [MemberService]
})

export class MemberModule {}
