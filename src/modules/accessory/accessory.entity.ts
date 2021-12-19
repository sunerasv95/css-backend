import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base/base.entity";
import { Brand } from "../brand/brand.entity";
import { Listing } from "../listing/listing.entity";

@Entity('accessories')
export class Accessory extends Base {

    @PrimaryGeneratedColumn()
    id: number

    //--------------------------------

    @OneToOne(() => Listing)
    @JoinColumn()
    listing: Listing

    @ManyToOne(() => Brand, brand => brand.accessories)
    brand: Brand
}