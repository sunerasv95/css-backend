import { slugify } from "./../../common/helpers"
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Base } from "../base/base.entity";
import { Listing } from "../listing/listing.entity";
import { Board } from "../board/board.entity";
import { Accessory } from "../accessory/accessory.entity";

@Entity({ name: 'brands' })
export class Brand extends Base {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150, type: 'varchar'})
    brandName: string

    @Column({ length: 150, type: 'varchar', unique: true })
    brandSlug: string

    @Column({ type: 'varchar', length: 200, default: ""})
    brandLogoImgUrl: string


    //-------------------------------------------------------------------

    @OneToMany(() => Board, board => board.brand)
    boards: Board[]

    @OneToMany(() => Accessory, accessory => accessory.brand)
    accessories: Accessory[]

    @BeforeInsert()
    async saveSlug(){
        this.brandSlug = await slugify(this.brandName);
    }

    @BeforeUpdate()
    async updateSlug(){
        this.brandSlug = await slugify(this.brandName);
    }
}
