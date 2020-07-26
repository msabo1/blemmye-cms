import { QueryDto } from "../../shared/dto/query.dto";
import { IsIn, IsOptional, IsNotEmpty, IsUUID, IsString, IsBoolean } from "class-validator";
import { UserStatus } from "../user-status.enum";
import { Transform } from "class-transformer";

export class QueryUserDto extends QueryDto{
    @IsIn(['username', 'status', 'role', 'updatedAt', 'createdAt'])
    sortBy?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    roleId?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(UserStatus))
    status?: UserStatus;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(cascade => cascade == 'true')
    cascade?: boolean;
}