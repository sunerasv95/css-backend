import { slugify } from "src/common/helpers";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, UpdateDateColumn } from "typeorm";
import { Base } from "../base/base.entity";

import { Listing } from "../listing/listing.entity";

@Entity({ name: 'categories' })
@Tree('nested-set')
export class Category extends Base{
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150, type: 'varchar'})
    categoryName: string

    @Column({ length: 150, type: 'varchar', unique: true })
    categorySlug: string

    @Column({ type: 'tinyint'})
    isParent: number

    
    @TreeParent()
    parent: Category

    @TreeChildren()
    children: Category[]
   
    @OneToMany(() => Listing, lst => lst.category)
    listings: Promise<Listing[]>

    @BeforeInsert()
    async saveSlug(){
        this.categorySlug = await slugify(this.categoryName);
    }

    @BeforeUpdate()
    async updateSlug(){
        this.categorySlug = await slugify(this.categoryName);
    }
}