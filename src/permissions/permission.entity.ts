import { Entity, BaseEntity, PrimaryColumn, OneToMany, Column } from "typeorm";
import { RolePrivilege } from "../roles/role-privilege";

@Entity('permissions')
export class Permission extends BaseEntity{
    @PrimaryColumn('text')
    name: string;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.permission)
    rolePrivileges: RolePrivilege[];
}
