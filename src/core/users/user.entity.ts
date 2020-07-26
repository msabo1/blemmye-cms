import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique, JoinColumn, OneToMany } from "typeorm";
import { Role } from "../roles/entities/role.entity";
import { UserStatus } from "./user-status.enum";
import { Post } from "../blog/posts/entities/post.entity";
import { Comment } from "../blog/comments/comment.entity";

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

    @OneToMany(type => Post, post => post.author)
    posts: Post[];

    @OneToMany(type => Comment, comment => comment.author)
    comments: Comment[]

}