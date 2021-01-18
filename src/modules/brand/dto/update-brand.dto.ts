import { IsInt, IsString } from "class-validator";

export class UpdateBrandDto{

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    active: number;

}