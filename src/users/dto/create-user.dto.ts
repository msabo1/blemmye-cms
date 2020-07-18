import { IsString, IsNotEmpty, IsDefined, IsOptional, IsUUID, IsIn } from "class-validator";
import { UserStatus } from "../user-status.enum";

export class CreateUserDto{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    password: string;

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