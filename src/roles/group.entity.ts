import { BaseEntity, Entity, PrimaryColumn, OneToMany, Column } from "typeorm";
import { RolePrivilege } from "./role-privilege";

@Entity('groups')
export class Group extends BaseEntity{
    @PrimaryColumn('text')
    name: string;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.group)
    rolePrivileges: RolePrivilege[];
}