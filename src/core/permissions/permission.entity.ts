import { Entity, PrimaryColumn, OneToMany, Column } from "typeorm";
import { RolePrivilege } from "../roles/entities/role-privilege.entity";
import { PermissionExtension } from "../../plugins/entity-extensions/permission-extension.entity";

@Entity('permissions')
export class Permission{
    @PrimaryColumn('text')
    name: string;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.permission)
    rolePrivileges: RolePrivilege[];

    @Column(type => PermissionExtension)
    extension: PermissionExtension;
}
