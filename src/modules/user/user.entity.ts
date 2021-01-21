import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export default class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    firstName: string

    @Column({ type: 'varchar', length: 50 })
    lastName: string

    @Column({ type: 'varchar', length: 150, unique: true })
    username: string

    @Column({ type: 'varchar', length: 150, unique: true })
    email: string

    @Column({ type: 'varchar', length: 500})
    password: string

    @Column({ type: 'tinyint', default: 1 })
    isActive: number

    @Column({ type: 'tinyint', default: 0 })
    isDeleted: number

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @CreateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date

    // @BeforeInsert()
    // async hashPassword(){
    //     this.password = await bcrypt.hash(this.password, 10);
    // }
}