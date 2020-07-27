import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CommentStatus } from "./comment-status.enum";
import { User } from "../../users/user.entity";
import { Post } from "../posts/entities/post.entity";
import { CommentExtension } from "../../../plugins/entity-extensions/comment-extension.entity";

@Entity('comments')
export class Comment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @Column()
    status: CommentStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @ManyToOne(type => User, user => user.comments, {nullable: true})
    @JoinColumn({name: 'authorId'})
    author: User;

    @Column({nullable: true})
    authorId: string;

    @ManyToOne(type => Post, post => post.comments)
    @JoinColumn({name: 'postId'})
    post: Post;

    @Column()
    postId: string;

    @ManyToOne(type => Comment, comment => comment.replies, {nullable: true})
    @JoinColumn({name: 'parentId'})
    parent: Comment

    @Column({nullable: true})
    parentId: string;

    @OneToMany(type => Comment, comment => comment.parent)
    replies: Comment[]

    @Column(type => CommentExtension)
    extension: CommentExtension;
}