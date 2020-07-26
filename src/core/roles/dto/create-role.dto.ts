import { IsNotEmpty, IsDefined, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Privilege } from "../models/privilege.model";

export class CreateRoleDto{
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => Privilege)
    privileges?: Privilege[];
}