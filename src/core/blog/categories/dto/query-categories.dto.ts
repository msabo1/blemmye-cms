import { QueryDto } from "../../../shared/dto/query.dto";
import { IsIn, IsOptional, IsString, IsNotEmpty, IsUUID, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";

export class QueryCategoriesDto extends QueryDto{
    @IsIn(['name', 'updatedAt', 'createdAt'])
    sortBy?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    parentId?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(loadParent => loadParent == 'true')
    loadParent?: boolean;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(loadChildren => loadChildren == 'true')
    loadChildren?: boolean;
}