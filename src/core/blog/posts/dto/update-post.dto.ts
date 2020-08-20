import { PostStatus } from "../post-status.enum";
import { IsNotEmpty, IsString, IsOptional, IsIn, IsDate, IsArray } from "class-validator";
import { Tag } from "../entities/tag.entity";
import { Type } from "class-transformer";
import { Category } from "../../categories/category.entity";

export class UpdatePostDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    content?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    imagePath?: string;

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

    @IsOptional()
    @IsArray()
    categories?: Category[];
}
