import { Transform } from "class-transformer";
import { IsOptional, IsNotEmpty, IsBoolean } from "class-validator";

export class GetPageDto{
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