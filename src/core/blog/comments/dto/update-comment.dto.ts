import { IsOptional, IsNotEmpty, IsString, IsIn } from "class-validator";
import { CommentStatus } from "../comment-status.enum";

export class UpdateCommentDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    content?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsIn(Object.values(CommentStatus))
    status?: CommentStatus;
}