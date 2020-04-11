import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../roles/entities/role.entity";
import { UserStatus } from "./user-status.enum";

@Entity('users')
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

    @ManyToOne(type => Role, role => role.users)
    role: Role;

    @RelationId((user: User) => user.role)
    roleId: string;


}