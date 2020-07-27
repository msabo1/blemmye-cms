import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";
import { PageStatus } from "./page-status.enum";
import { PageExtension } from "../../plugins/entity-extensions/page-extension.entity";

@Entity('pages')
export class Page{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    status: PageStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    updatedAt: Date;

    @ManyToOne(type => User, user => user.posts, {nullable: true})
    @JoinColumn({name: 'authorId'})
    author?: User;

    @Column({nullable: true})
    authorId?: string;

    @Column(type => PageExtension)
    extension: PageExtension;
}