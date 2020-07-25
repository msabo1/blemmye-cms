import { IsDefined, IsNotEmpty, IsString, IsOptional, IsUUID, IsArray } from "class-validator";
import { Category } from "../category.entity";

export class CreateCategoryDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    parentId?: string;

    @IsOptional()
    @IsArray()
    children?: Category[];
}