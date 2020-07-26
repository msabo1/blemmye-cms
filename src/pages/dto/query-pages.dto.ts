import { QueryDto } from "../../shared/dto/query.dto";
import { PageStatus } from "../page-status.enum";
import { IsIn, IsOptional, IsNotEmpty, IsString, IsUUID, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";

export class QueryPagesDto extends QueryDto{
    @IsIn(['title', 'status', 'author', 'updatedAt', 'createdAt'])
    sortBy?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()    
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsIn(Object.values(PageStatus))
    status?: PageStatus;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    authorId?: string;

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