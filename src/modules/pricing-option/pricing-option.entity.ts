import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: 'pricing_options' })
export class PricingOption extends Base{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150, type: 'varchar'})
    pricingOption: string

}