import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "../admin/admin.entity";
import { Base } from "../base/base.entity";
import { Permission } from "../permission/permission.entity";

@Entity({ name: 'roles'})
export class Role extends Base {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 20, unique: true })
    roleName: string

    @Column({ type: 'varchar', length: 20, unique: true })
    roleCode: string


    //------------------------------------------

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[]

    @OneToMany(() => Admin, admin => admin.role)
    admins: Admin

}