import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RolePrivilege } from "./role-privilege";

@Entity('roles')
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.role)
    privileges: RolePrivilege[];
    
}
