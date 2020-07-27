import { Entity, ManyToOne, Column} from "typeorm";
import { Permission } from "../../permissions/permission.entity";
import { Group } from "../../groups/group.entity";
import { Role } from "./role.entity";
import { RolePrivilegeExtension } from "../../../plugins/entity-extensions/role-privilege-extension.entity";

@Entity('rolePrivileges')
export class RolePrivilege{
    @ManyToOne(type => Permission, permission => permission.rolePrivileges, {primary: true, eager: true})
    permission: Permission;

    @ManyToOne(type => Group, group => group.rolePrivileges, {primary: true, eager: true})
    group: Group;

    @ManyToOne(type => Role, role => role.privileges, {primary: true, onDelete: 'CASCADE'})
    role: Role;

    @Column(type => RolePrivilegeExtension)
    extension: RolePrivilegeExtension;
}