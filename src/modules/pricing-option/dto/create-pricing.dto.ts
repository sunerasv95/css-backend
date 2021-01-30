import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePricingDto{

    @IsEmpty()
    @IsString()
    pricingOptName: string;

}