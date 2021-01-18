import { IsEmpty, IsInt } from "class-validator";

export class BrandIdDto{

    @IsEmpty()
    @IsInt()
    brandId: number;
}