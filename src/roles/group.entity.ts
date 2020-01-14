import { BaseEntity, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { RolePrivilege } from "./role-privilege";

@Entity('groups')
export class Group extends BaseEntity{
    @PrimaryColumn('text')
    name: string;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.group)
    rolePrivileges: RolePrivilege[];
}