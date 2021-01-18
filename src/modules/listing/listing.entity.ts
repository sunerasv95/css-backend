import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "../brand/brand.entity";
import { Category } from '../category/category.entity';
// export enum ListType {
//     SALE = "1",
//     RENT = "2"
// }

@Entity()
export class Listing{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 200 })
    title: string

    @Column({ type: 'varchar', length: 600 })
    description: string

    @Column({ type: 'varchar', length: 200 })
    slug: string

    @Column()
    listType: number

    @Column()
    referenceNumber: string

    @Column()
    isActive: number

    @Column({ type: 'timestamp', default: null })
    publishedAt: Date

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @ManyToOne(() => Category, cat => cat.listings)
    category: Category

    @ManyToOne(() => Brand, brand => brand.listings)
    brand: Category
        
}