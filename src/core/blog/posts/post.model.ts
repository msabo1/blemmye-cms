import { PostStatus } from "./post-status.enum";
import { Tag } from "./entities/tag.entity";
import { UserVM } from "../../users/models/user.model";
import { Category } from "../categories/category.entity";

export class PostVM{
    id: string;

    title: string;

    content: string;

    imagePath?: string;

    status: PostStatus;

    publishOn?: Date;

    createdAt: Date;

    updatedAt: Date;

    tags: Tag[];
    
    categories: Category[]

    author?: UserVM;

    authorId?: string;

}
