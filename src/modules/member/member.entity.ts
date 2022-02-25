import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Base } from "../base/base.entity";
import { Listing } from "../listing/listing.entity";

import User from "../user/user.entity";
// import { Gender } from "../boards/types/gender.enum";

@Entity({ name: 'members' })
export class Member extends Base{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' , length: 50 , unique: true })
    memberCode: string

    @Column({ type: 'varchar', length: 50 })
    firstName: string

    @Column({ type: 'varchar', length: 50 })
    lastName: string

    @Column({ type: 'varchar', length: 100 , default: null })
    displayName: string

    @Column({ type: 'varchar', length: 20 })
    username: string

    @Column({ type: 'varchar', length: 100 })
    password: string

    // @Column({ type: 'simple-enum', enum: Gender })
    // gender: string

    @Column({ type: 'varchar', length: 200, default: '' })
    bio: string

    @Column({ type: 'varchar', length: 150, default: '' })
    profileImgUrl: string

    // @Column({ type: 'float', precision: 10, scale: 4, default: null })
    // latitude: number

    // @Column({ type: 'float', precision: 10, scale: 4, default: null })
    // longitude: number

    @Column({ type: 'datetime' })
    joinedAt: Date

    

    // @OneToOne(() => User, user => user.member)
    // @JoinColumn()
    // user: User

    // @OneToMany(() => Listing, list => list.member)
    // listings: []
}