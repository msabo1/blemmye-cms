import { IsUUID, IsDefined, IsNotEmpty } from "class-validator";

export class GetRoleDto{
    @IsDefined()
    @IsNotEmpty()
    @IsUUID()
    id: string;
}