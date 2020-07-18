import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique, JoinColumn } from "typeorm";
import { Role } from "../roles/entities/role.entity";
import { UserStatus } from "./user-status.enum";

@Entity('users')
@Unique(['username'])
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    status: UserStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @ManyToOne(type => Role, role => role.users, {nullable: false})
    @JoinColumn({name: 'roleId'})
    role: Role;

    @Column()
    roleId: string;


}