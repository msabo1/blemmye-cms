import { Entity, PrimaryColumn, ManyToMany } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class Tag{
    @PrimaryColumn()
    name: string;

    @ManyToMany(type => Post, post => post.tags)
    posts: Post[];
}