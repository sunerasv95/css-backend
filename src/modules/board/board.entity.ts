import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Base } from "../base/base.entity";
import { Brand } from "../brand/brand.entity";
import { FinType } from "../fin-type/fin-type.entity";
import { Listing } from "../listing/listing.entity";
import { Madeof } from "../madeof/madeof.entity";
import { Wave } from "../wave/wave.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@Entity({ name: 'boards' })
export class Board extends Base {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50, type: 'varchar'})
    dimensions: string

    @Column({ type: 'varchar' })
    volume: string

    @Column({ type: 'varchar' })
    rail: string

   //--------------------------------------------------------------
    
    @OneToOne(() => Listing)
    @JoinColumn()
    listing: Listing

    @ManyToOne(() => Brand, brand => brand.boards)
    brand: Brand

    @ManyToOne(() => Wave, wave => wave.boards)
    wave: Wave

    @ManyToOne(() => Madeof, madeof => madeof.boards)
    madeof: Madeof

    @ManyToOne(() => FinType, finType => finType.boards)
    finType: FinType

}
