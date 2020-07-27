import { Entity, PrimaryColumn, OneToMany, Column } from "typeorm";
import { RolePrivilege } from "../roles/entities/role-privilege.entity";
import { GroupExtension } from "../../plugins/entity-extensions/group-extension.entity";

@Entity('groups')
export class Group{
    @PrimaryColumn('text')
    name: string;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.group)
    rolePrivileges: RolePrivilege[];

    @Column(type => GroupExtension)
    extension: GroupExtension;
}