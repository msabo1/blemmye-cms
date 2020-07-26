import { IsString, IsNotEmpty, IsOptional, IsUUID, IsIn } from "class-validator";
import { UserStatus } from "../user-status.enum";

export class UpdateUserDto{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username?: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    roleId?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(UserStatus))
    status?: UserStatus;
}