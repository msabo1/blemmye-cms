import { Entity, PrimaryColumn, ManyToMany, Column } from "typeorm";
import { Post } from "./post.entity";
import { TagExtension } from "../../../../plugins/entity-extensions/tag-extension.entity";

@Entity()
export class Tag{
    @PrimaryColumn()
    name: string;

    @ManyToMany(type => Post, post => post.tags)
    posts: Post[];

    @Column(type => TagExtension)
    extension: TagExtension;
}