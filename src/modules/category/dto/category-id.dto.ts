import { IsEmpty, IsInt } from "class-validator";

export class CatIdDto{

    @IsEmpty()
    @IsInt()
    categoryId: number;
}