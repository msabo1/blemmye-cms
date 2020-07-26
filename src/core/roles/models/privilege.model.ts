import { IsNotEmpty, IsString, IsDefined, ValidateNested, IsNotEmptyObject } from "class-validator";
import { Type } from "class-transformer";

class PrivilegeElem{
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class Privilege{
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PrivilegeElem)
    permission: PrivilegeElem;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PrivilegeElem)
    group: PrivilegeElem;
}