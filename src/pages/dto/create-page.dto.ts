import { IsString, IsDefined, IsNotEmpty, IsIn, Allow } from "class-validator";
import { PageStatus } from "../page-status.enum";

export class CreatePageDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDefined()
    @IsNotEmpty()
    @IsIn(Object.values(PageStatus))
    status: PageStatus;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    content: string;

    @Allow()
    authorId: string;
}