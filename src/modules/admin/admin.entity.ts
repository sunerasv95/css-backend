import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base/base.entity";
import { Role } from "../role/role.entity";

@Entity({ name: 'admins' })
export class Admin extends Base{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    fullName: string

    @Column({ type: 'varchar', length: 50 })
    adminCode: string

    @Column({ type: 'varchar', length: 20 })
    username: string

    @Column({ type: 'varchar', length: 100 })
    password: string
    
    @Column({ type: 'tinyint' })
    isBlocked: number

    //-------------------------------

    @ManyToOne(() => Role, role => role.admins)
    role: Role

} 