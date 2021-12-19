import { IsEmpty, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

const defaultLogo = "https://picsum.photos/200/300";

export class CreateBrandDto{

    // @IsEmpty()
    @IsString()
    readonly brandName: string

    //@IsEmpty()
    @IsNotEmpty()
    @IsString()
    readonly brandLogoImgUrl: string

    //@IsEmpty()
    @IsInt()
    readonly isActive: number

}