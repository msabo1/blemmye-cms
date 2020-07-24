import { QueryDto } from "../../../shared/dto/query.dto";
import { IsIn, IsOptional, IsNotEmpty, IsString, IsUUID, IsBoolean } from "class-validator";
import { PostStatus } from "../post-status.enum";
import { Transform } from "class-transformer";

export class QueryPostsDto extends QueryDto{
    @IsIn(['title', 'publishOn', 'status', 'author', 'updatedAt', 'createdAt'])
    sortBy?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsIn(Object.values(PostStatus))
    status?: PostStatus;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    authorId?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    tag?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(loadAuthor => loadAuthor == 'true')
    loadAuthor?: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(cascade => cascade == 'true')
    cascade?: boolean;

}