import { Entity, BaseEntity, PrimaryColumn, OneToMany } from "typeorm";
import { RolePrivilege } from "./role-privilege";

@Entity('permissions')
export class Permission extends BaseEntity{
    @PrimaryColumn('text')
    name: string;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.permission)
    rolePrivileges: RolePrivilege[];
}
