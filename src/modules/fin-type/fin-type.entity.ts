import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base/base.entity";
import { Board } from "../board/board.entity";

@Entity('fin_types')
export class FinType extends Base{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    finTypeName: string


    //-----------------------------------------------


    @OneToMany(() => Board, board => board.finType)
    boards: Board[]
}