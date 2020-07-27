import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn } from "typeorm";
import { Post } from "../posts/entities/post.entity";
import { CategoryExtension } from "../../../plugins/entity-extensions/category-extension.entity";

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

    @ManyToOne(type => Category, category => category.children, {nullable: true, onDelete:'SET NULL'})
    @JoinColumn({name: 'parentId'})
    parent: Category;

    @Column({nullable: true})
    parentId: string;

    @OneToMany(type => Category, category => category.parent)
    children: Category[]

    @ManyToMany(type => Post, post => post.categories)
    posts: Post[];

    @Column(type => CategoryExtension)
    extension: CategoryExtension;
}