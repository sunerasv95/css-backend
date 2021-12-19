import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Base } from "../base/base.entity";
import { Board } from "../board/board.entity";

@Entity({ name: 'waves' })
export class Wave extends Base {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    name: string


    //-------------------------------------------------------

    @OneToMany(() => Board, board => board.wave)
    boards: Board[]

}