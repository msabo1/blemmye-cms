import { UserVM } from "../../users/models/user.model";
import { CommentStatus } from "./comment-status.enum";

export class CommentVM{
    id: string;

    content: string;

    status: CommentStatus;

    createdAt: Date;

    updatedAt: Date;

    author: UserVM;

    authorId: string;

    postId: string;

    parent: CommentVM

    parentId: string;

    replies: CommentVM[]
}