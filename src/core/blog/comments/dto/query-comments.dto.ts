import { QueryDto } from "../../../shared/dto/query.dto";
import { IsIn, IsNotEmpty, IsUUID, IsOptional, IsBoolean } from "class-validator";
import { CommentStatus } from "../comment-status.enum";
import { Transform } from "class-transformer";

export class QueryCommentsDto extends QueryDto{
    @IsIn(['status', 'author', 'updatedAt', 'createdAt'])
    sortBy?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsIn(Object.values(CommentStatus))
    status?: CommentStatus;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    postId?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    parentId?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    authorId?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(onlyRoots => onlyRoots == 'true')
    onlyRoots?: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(loadReplies => loadReplies == 'true')
    loadReplies?: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(loadParent => loadParent == 'true')
    loadParent?: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(loadAuthor => loadAuthor == 'true')
    loadAuthor?: boolean;
}