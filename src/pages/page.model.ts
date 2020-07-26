import { PageStatus } from "./page-status.enum";
import { UserVM } from "../users/models/user.model";

export class PageVM{
    id: string;

    title: string;

    content: string;

    status: PageStatus;

    createdAt: Date;

    updatedAt: Date;

    author?: UserVM;

    authorId?: string;

}