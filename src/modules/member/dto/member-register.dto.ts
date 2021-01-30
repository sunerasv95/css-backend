import { IsEmpty, IsEnum, IsString } from 'class-validator';
import { Gender } from '../types/gender.enum';

export class MemberRegisterDto {

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

    @IsEmpty()
    @IsString()
    @IsEnum(Gender)
    gender: string

   
}