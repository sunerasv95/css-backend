import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Base } from "../base/base.entity";
import { Board } from "../board/board.entity";


@Entity({ name: 'madeofs' })
export class Madeof extends Base {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    materialName: string

   
    
    @OneToMany(() => Board, board => board.madeof)
    boards: Board[]
}