import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Listing } from "../listing/listing.entity";

import User from "../user/user.entity";
import { Gender } from "./types/gender.enum";

@Entity()
export class Member {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    firstName: string

    @Column({ type: 'varchar', length: 50 })
    lastName: string

    @Column({ type: 'varchar', length: 100 , default: ''})
    displayName: string

    @Column({ type: 'simple-enum', enum: Gender })
    gender: string

    @Column({ type: 'varchar', length: 200, default: '' })
    bio: string

    @Column({ type: 'varchar', length: 150, default: '' })
    profileImgUrl: string

    @Column({ type: 'float', precision: 10, scale: 4, default: null })
    latitude: number

    @Column({ type: 'float', precision: 10, scale: 4, default: null })
    longitude: number

    @Column({ type: 'timestamp' })
    joinedAt: Date

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date

    @OneToOne(() => User, user => user.member)
    @JoinColumn()
    user: User

    @OneToMany(() => Listing, list => list.member)
    listings: []
}