import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCatDto{

    @IsEmpty()
    @IsString()
    name: string;

    @IsEmpty()
    @IsString()
    description: string

    @IsEmpty()
    @IsNumber()
    parent: number
}