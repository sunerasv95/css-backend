import { IsDecimal, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBoardDto } from 'src/modules/board/dto/create-board.dto';
import { Category } from 'src/modules/category/category.entity';
import { TradeMode } from 'src/modules/trade-type/enums/trade-mode.enum';
import { CreateAccessoryDto } from 'src/modules/accessory/dto/create-accessory.dto';
export class CreateListDto {
    id?: number

    //@IsEmpty()
    @IsString()
    listingTitle: string;

    @IsString()
    listingSlug?: string

    //@IsEmpty()
    @IsString()
    listingDescription: string

    //@IsEmpty()
    @IsEnum(TradeMode)
    tradeType: string

    //@IsEmpty()
    @IsNumber()
    isFeatured: number

    //@IsEmpty()
    @IsNumber()
    isPaid: number

    //@IsEmpty()
    @IsNumber()
    isUrgent: number

    status: number

    isDeleted: number

    //@IsEmpty()
    @IsNumber()
    memberId?: number

    //@IsEmpty()
    @IsNumber()
    categoryId?: number
    
    category: Category

    board? : CreateBoardDto

    accessory?: CreateAccessoryDto

}