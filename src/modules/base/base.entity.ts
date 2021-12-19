import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Base {

    @Column({ type: 'tinyint', default: 1})
    isActive: number

    @Column({ type: 'tinyint', default: 0 })
    isDeleted: number

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime'})
    updatedAt: Date

    @DeleteDateColumn({type: 'datetime'})
    deletedAt: Date
} 