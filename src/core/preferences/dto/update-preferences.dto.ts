import { IsOptional, IsUUID, IsNotEmpty } from "class-validator";

export class UpdatePreferencesDto{
    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    defaultRoleId?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    visitorRoleId?: string;
}