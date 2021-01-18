import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBrandDto{

    @IsEmpty()
    @IsString()
    name: string;

    @IsEmpty()
    @IsString()
    description: string

}