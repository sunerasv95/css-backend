import { IsEmpty, IsString } from 'class-validator';

export class UserLoginDto{

    @IsEmpty()
    @IsString()
    username: string

    @IsEmpty()
    @IsString()
    password: string
}