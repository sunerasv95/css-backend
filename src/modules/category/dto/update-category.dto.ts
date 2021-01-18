import { IsEmpty, IsInt, IsNumber, IsString } from "class-validator";

export class UpdateCatDto{

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    isParent: number;

    @IsInt()
    active: number;

    parent: any;

}