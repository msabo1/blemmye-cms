import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { Post } from "../posts/entities/post.entity";

@Entity('categories')
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @ManyToOne(type => Category, category => category.children)
    parent: Category;

    @OneToMany(type => Category, category => category.parent)
    children: Category[]

    @ManyToMany(type => Post, post => post.categories)
    posts: Post[];
}