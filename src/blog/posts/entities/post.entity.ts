import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "../../../users/user.entity";
import { PostStatus } from "../post-status.enum";
import { Tag } from "./tag.entity";

@Entity('posts')
export class Post{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({nullable: true})
    image_path?: string;

    @Column()
    status: PostStatus;

    @Column({nullable: true})
    publishOn?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @ManyToMany(type => Tag, tag => tag.posts, {cascade: ['insert', 'update']})
    @JoinTable()
    tags: Tag[];

    @ManyToOne(type => User, user => user.posts, {nullable: true})
    @JoinColumn({name: 'authorId'})
    author?: User;

    @Column({nullable: true})
    authorId?: string;

}