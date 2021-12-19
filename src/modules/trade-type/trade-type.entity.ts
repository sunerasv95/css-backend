import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Base } from "../base/base.entity";
import { Listing } from "../listing/listing.entity";
import { TradeMode } from "./enums/trade-mode.enum";

@Entity('trade_types')
export class TradeType extends Base{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'simple-enum' , enum: TradeMode , nullable: false , default: TradeMode.SALE})
    tradeType: string

}