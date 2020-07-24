import { PostStatus } from "./post-status.enum";
import { Tag } from "./entities/tag.entity";
import { UserVM } from "../../users/models/user.model";

export class PostVM{
    id: string;

    title: string;

    content: string;

    image_path?: string;

    status: PostStatus;

    publishOn?: Date;

    createdAt: Date;

    updatedAt: Date;

    tags: Tag[];

    author?: UserVM;

    authorId?: string;

}