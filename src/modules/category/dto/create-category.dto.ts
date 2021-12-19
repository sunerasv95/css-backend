import { IsEmpty, IsInt, IsString } from 'class-validator';
import { Category } from '../category.entity';

export class CreateCatDto{

    @IsEmpty()
    @IsString()
    categoryName: string;

    @IsInt()
    isParent?: number

    @IsEmpty()
    @IsInt()
    parentId: number

    parent: Category

    @IsInt()
    isActive: number

}