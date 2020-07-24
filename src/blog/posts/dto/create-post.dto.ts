import { PostStatus } from "../post-status.enum";
import { IsDefined, IsNotEmpty, IsString, IsOptional, IsIn, IsDate, IsArray } from "class-validator";
import { Tag } from "../entities/tag.entity";
import { Type } from "class-transformer";

export class CreatePostDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    image_path?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsIn(Object.values(PostStatus))
    status?: PostStatus;

    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    publishOn?: Date;

    @IsOptional()
    @IsArray()
    tags?: Tag[];

    authorId: string;
}