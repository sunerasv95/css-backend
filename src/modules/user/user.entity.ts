import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashSync } from 'bcrypt';
import { Member } from "../member/member.entity";

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 150, unique: true })
    username: string

    @Column({ type: 'varchar', length: 15, default: ''})
    phone: string

    @Column({ type: 'varchar', length: 150, unique: true })
    email: string

    @Column({ type: 'varchar', length: 500})
    password: string

    @Column({ type: 'tinyint', default: 0 })
    IsEmailVerified: number

    @Column({ type: 'tinyint', default: 1 })
    isActive: number

    @Column({ type: 'tinyint', default: 0 })
    isDeleted: number

    @Column({ type: 'timestamp', default: null })
    EmailVerifiedAt: Date

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date

    @OneToOne(() => Member, mem => mem.user)
    member: Member

    @BeforeInsert()
    async hashPassword(){
        this.password = hashSync(this.password, 10);
    }

    @BeforeInsert()
    async emailToLowerCase(){
        this.email = this.email.toLowerCase();
    }
}