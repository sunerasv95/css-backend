import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    async create(
        @Body()userData: CreateUserDto): Promise<any> {
        return this.userService.createUser(userData);
    }
}
