import { slugify } from "src/common/helpers";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Listing } from "../listing/listing.entity";

@Entity()
export class Brand{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 150, type: 'varchar'})
    name: string

    @Column({ length: 150, type: 'varchar', unique: true })
    slug: string

    @Column({ length: 255 , type: 'varchar'})
    description: string

    @Column({ type: 'varchar', length: 200, default: ""})
    brandLogoImgUrl: string

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
   
    @OneToMany(() => Listing, lst => lst.brand)
    listings: []

    @BeforeInsert()
    saveSlug(){
        this.slug = slugify(this.name);
    }

    @BeforeUpdate()
    updateSlug(){
        this.slug = slugify(this.name);
    }
}
