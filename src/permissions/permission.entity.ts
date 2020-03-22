import { Entity, PrimaryColumn, OneToMany, Column } from "typeorm";
import { RolePrivilege } from "../roles/role-privilege";

@Entity('permissions')
export class Permission{
    @PrimaryColumn('text')
    name: string;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.permission)
    rolePrivileges: RolePrivilege[];
}
