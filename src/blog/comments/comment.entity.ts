import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CommentStatus } from "./comment-status.enum";
import { User } from "../../users/user.entity";
import { Post } from "../posts/entities/post.entity";

@Entity('comments')
export class Comment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @Column()
    status: CommentStatus;

    @ManyToOne(type => User, user => user.comments)
    @JoinColumn({name: 'authorId'})
    author: User;

    @Column()
    authorId: string;

    @ManyToOne(type => Post, post => post.comments)
    @JoinColumn({name: 'postId'})
    post: Post;

    @Column()
    postId: string;

    @ManyToOne(type => Comment, comment => comment.replies)
    @JoinColumn({name: 'parentId'})
    parent: Comment

    @Column()
    parentId: string;

    @OneToMany(type => Comment, comment => comment.parent)
    replies: Comment[]
}