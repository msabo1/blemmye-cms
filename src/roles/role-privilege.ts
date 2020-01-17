import { Entity, ManyToOne} from "typeorm";
import { Permission } from "../permissions/permission.entity";
import { Group } from "../groups/group.entity";
import { Role } from "./role.entity";

@Entity('rolePrivileges')
export class RolePrivilege{
    @ManyToOne(type => Permission, permission => permission.rolePrivileges, {primary: true})
    permission: Permission;

    @ManyToOne(type => Group, group => group.rolePrivileges, {primary: true})
    group: Group;

    @ManyToOne(type => Role, role => role.privileges, {primary: true})
    role: Role;
}