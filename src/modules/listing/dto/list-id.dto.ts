import { IsEmpty, IsString } from "class-validator";

export class ListingIdDto{
    @IsEmpty()
    @IsString()
    listId: string;
}