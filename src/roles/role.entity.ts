import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, AfterLoad } from "typeorm";
import { RolePrivilege } from "./role-privilege";

@Entity('roles')
export class Role{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @OneToMany(type => RolePrivilege, rolePrivilege => rolePrivilege.role, {eager: true, cascade: true})
    privileges: RolePrivilege[];

    /**
     * This routine is necessary due to typeorm limitations. 
     * If role has no privileges typeorm loads it as privilege with permission and group set to null. 
     * This routine detects such roles and sets their privileges to empty array.
     * It is executed after each role is loaded.
     */ 
    @AfterLoad()
    private fixNullPrivilege(): void{
        if(!this.privileges || !this.privileges[0]){
            return;
        }
        const privilege: RolePrivilege = this.privileges[0];
        if(!privilege.permission || !privilege.group){
            this.privileges = [];
        }
    }
}
