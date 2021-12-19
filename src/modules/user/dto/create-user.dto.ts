import { IsEmpty, IsString } from 'class-validator';

// import { Gender } from 'src/modules/member/types/gender.enum';

export class CreateUserDto{

    @IsEmpty()
    @IsString()
    username: string

    @IsEmpty()
    @IsString()
    phone?: string

    @IsEmpty()
    @IsString()
    email: string

    @IsEmpty()
    @IsString()
    password: string
}