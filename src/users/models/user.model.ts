import { UserStatus } from "../user-status.enum";
export class UserVM{
    id: string;
    username: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    roleId: string;
}