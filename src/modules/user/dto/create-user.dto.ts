import { IsEmpty, IsString } from 'class-validator';

export class CreateUserDto{

    @IsEmpty()
    @IsString()
    firstName: string

    @IsEmpty()
    @IsString()
    lastName: string

    @IsEmpty()
    @IsString()
    username: string

    @IsEmpty()
    @IsString()
    email: string

    @IsEmpty()
    @IsString()
    password: string
}