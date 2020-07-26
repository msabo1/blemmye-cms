import { IsOptional, IsNotEmpty, IsBoolean } from "class-validator";
import { Transform } from "class-transformer";

export class GetUserDto{
    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    @Transform(cascade => cascade == 'true')
    cascade?: boolean;
}