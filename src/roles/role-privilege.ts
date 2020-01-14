import { Entity, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { Group } from "./group.entity";
import { Role } from "./role.entity";

@Entity('rolePrivileges')
export class RolePrivilege extends BaseEntity{
    @ManyToOne(type => Permission, permission => permission.rolePrivileges, {primary: true})
    permission: Permission;

    @ManyToOne(type => Group, group => group.rolePrivileges, {primary: true})
    group: Group;

    @ManyToOne(type => Role, role => role.privileges, {primary: true})
    role: Role;
}