import { IsEmpty, IsInt } from "class-validator";

export class PricingIdDto{

    @IsEmpty()
    @IsInt()
    optionId: number;
}