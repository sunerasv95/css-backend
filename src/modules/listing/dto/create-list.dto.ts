import { IsEmpty, IsNumber, IsString } from 'class-validator';

export class CreateListDto{

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
    featured: number

    @IsEmpty()
    @IsNumber()
    paid: number

    @IsEmpty()
    @IsNumber()
    member: number

    @IsEmpty()
    @IsNumber()
    category: number

    @IsEmpty()
    @IsNumber()
    brand: number
}