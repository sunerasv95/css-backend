import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateListDto{

    @IsEmpty()
    @IsString()
    title: string;

    @IsEmpty()
    @IsString()
    description: string

    @IsEmpty()
    @IsNumber()
    listType: number

    @IsEmpty()
    @IsNumber()
    category: number

    @IsEmpty()
    @IsNumber()
    brand: number
}