import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import {UserRepository} from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepositry: UserRepository){}

    async findUserByUsername(username: string){
        return await this.userRepositry.findOne({ username: username });
    }

    async createUser(userData: CreateUserDto): Promise<any>{
        return await this.userRepositry.createNewUser(userData);
    }
}
