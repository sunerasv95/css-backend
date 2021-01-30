import { IsDecimal, IsEmpty, IsNumber, IsString } from 'class-validator';
import { Double } from 'typeorm';

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
    @IsDecimal()
    listPrice: Double

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

    @IsEmpty()
    @IsNumber()
    pricingOption: number
}