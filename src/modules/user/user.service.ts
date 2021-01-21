import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import {UserRepository} from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepositry: UserRepository){}

    async findUserByUsername(data:any){
        return this.userRepositry.findOne({ username: data.username });
    }

    async createUser(userData: CreateUserDto): Promise<any>{
        return this.userRepositry.createNewUser(userData);
    }
}
