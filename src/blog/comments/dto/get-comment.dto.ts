import { IsOptional, IsNotEmpty, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";

export class GetCommentDto{
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