import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Double, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { slugify, makeRef} from "src/common/helpers";
import { Brand } from "../brand/brand.entity";
import { Category } from '../category/category.entity';
import { Member } from "../member/member.entity";
import { PricingOption } from "../pricing-option/pricing-option.entity";

@Entity()
export class Listing{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 200 })
    listingRefNo: string

    @Column({ type: 'varchar', length: 200 })
    title: string

    @Column({ type: 'varchar', length: 200 })
    slug: string

    @Column({ type: 'varchar', length: 600 })
    description: string

    @Column({ type : 'tinyint' })
    listType: number

    @Column({ type: 'double', precision: 18, scale: 2 })
    listPrice: Double

    @Column({ type : 'tinyint' , default: 0 })
    isFeatured: number

    @Column({ type : 'tinyint', default: 0  })
    isPaid: number

    @Column({ type : 'tinyint', default: 0 })
    isUrgent: number

    @Column({ type : 'tinyint' })
    status: number

    @Column({ type : 'tinyint', default: 0 })
    isDeleted: number

    @Column({ type: 'timestamp', default: null })
    publishedAt: Date

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date

    @ManyToOne(() => Member, mem => mem.listings)
    member: Member

    @ManyToOne(() => Category, cat => cat.listings)
    category: Category

    @ManyToOne(() => Brand, brand => brand.listings)
    brand: Category

    @OneToOne(() => PricingOption)
    @JoinColumn()
    pricingOption: PricingOption

    // @ManyToMany(() => PricingOption)
    // @JoinTable({ 
    //     name: 'listing_pricing_option'
    // })
    // pricingOptions: PricingOption[]

    @BeforeInsert()
    async saveSlug(){
        this.slug = await slugify(this.title);
    }

    @BeforeInsert()
    async saveReference(){
        this.listingRefNo =  await makeRef(8);
    }
        
}