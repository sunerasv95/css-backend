import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../base/base.entity";

@Entity({ name: 'permissions'})
export class Permission extends Base {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50})
    permissionName: string

    @Column({ type: 'varchar', length: 50})
    permissionSlug: string

}