import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";

import { Listing } from "src/modules/listing/listing.entity";
import { slugify } from '../../common/helpers';

@Entity()
@Tree('nested-set')
export class Category{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150, type: 'varchar'})
    name: string

    @Column({ length: 150, type: 'varchar', unique: true })
    slug: string

    @Column({ length: 255 , type: 'varchar'})
    description: string

    @Column({ type: 'tinyint'})
    isParent: number

    @Column({ type: 'tinyint', default: 1 })
    isActive: number

    @Column({ type: 'tinyint', default: 0 })
    isDeleted: number

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date

    @TreeParent()
    parent: Category

    @TreeChildren()
    children: Category[]
   
    @OneToMany(() => Listing, lst => lst.category)
    listings: []

    @BeforeInsert()
    async saveSlug(){
        this.slug = await slugify(this.name);
    }

    @BeforeUpdate()
    async updateSlug(){
        this.slug = await slugify(this.name);
    }
}