import { IsString, IsNotEmpty, IsIn, Allow, IsOptional } from "class-validator";
import { PageStatus } from "../page-status.enum";

export class UpdatePageDto{
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
    @IsString()
    content?: string;
}