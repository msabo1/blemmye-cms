import { IsString, IsNotEmpty, IsDefined } from "class-validator";

export class RegisterUserDto{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    password: string;

}