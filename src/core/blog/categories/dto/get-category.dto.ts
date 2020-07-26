import { IsOptional, IsNotEmpty, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";

export class GetCategoryDto{
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