import { IsOptional, IsNotEmpty, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";

export class GetPostDto{
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