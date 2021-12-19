import { Brand } from "../../brand/brand.entity"
import { FinType } from "../../fin-type/fin-type.entity"
import { Listing } from "../../listing/listing.entity"
import { Madeof } from "../../madeof/madeof.entity"
import { Wave } from "../../wave/wave.entity"

export class CreateBoardDto {

    dimensions: string

    volume:string

    rail: string

    listing?: Listing

    brandId: number
    brand: Brand

    waveTypeId: number
    wave: Wave

    madeofId: number
    madeof: Madeof

    finTypeId: number
    finType: FinType
}