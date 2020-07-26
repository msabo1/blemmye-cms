import { CommentStatus } from "../comment-status.enum";
import { IsDefined, IsString, IsNotEmpty, IsIn, IsUUID, IsOptional } from "class-validator";

export class CreateCommentDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsDefined()
    @IsNotEmpty()
    @IsIn(Object.values(CommentStatus))
    status: CommentStatus;

    @IsDefined()
    @IsNotEmpty()
    @IsUUID()
    postId: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    parentId?: string;

    authorId?: string;
}