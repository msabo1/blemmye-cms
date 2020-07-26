import { IsUUID, IsDefined, IsNotEmpty } from "class-validator";

export class Id{
    @IsDefined()
    @IsNotEmpty()
    @IsUUID()
    id: string;
}