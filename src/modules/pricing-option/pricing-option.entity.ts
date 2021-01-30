import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PricingOption {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150, type: 'varchar'})
    pricingOption: string

    @Column({ type: 'tinyint', default: 0 })
    isDeleted: number

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date
}