import { Entity, PrimaryColumn, OneToMany, Column } from "typeorm";
import { RolePrivilege } from "../roles/entities/role-privilege.entity";

@Entity('groups')
export class Group{
    @PrimaryColumn('text')
    name: string;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.group)
    rolePrivileges: RolePrivilege[];
}