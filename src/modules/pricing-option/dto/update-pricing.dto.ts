import { IsEmpty, IsString } from 'class-validator';

export class UpdatePricingDto{

    @IsEmpty()
    @IsString()
    pricingOptName: string;

}