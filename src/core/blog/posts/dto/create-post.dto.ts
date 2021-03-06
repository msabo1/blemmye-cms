import { PostStatus } from "../post-status.enum";
import { IsDefined, IsNotEmpty, IsString, IsOptional, IsIn, IsDate, IsArray, Allow } from "class-validator";
import { Tag } from "../entities/tag.entity";
import { Type } from "class-transformer";
import { Category } from "../../categories/category.entity";

export class CreatePostDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDefined()
    @IsNotEmpty()
    @IsIn(Object.values(PostStatus))
    status: PostStatus;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    imagePath?: string;

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

    @Allow()
    authorId: string;
}
