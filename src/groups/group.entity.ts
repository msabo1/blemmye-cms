import { Entity, PrimaryColumn, OneToMany, Column } from "typeorm";
import { RolePrivilege } from "../roles/role-privilege";

@Entity('groups')
export class Group{
    @PrimaryColumn('text')
    name: string;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.group)
    rolePrivileges: RolePrivilege[];
}