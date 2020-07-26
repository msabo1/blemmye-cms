import { UserStatus } from "../user-status.enum";
import { Role } from "../../roles/entities/role.entity";
export class UserVM{
    id: string;
    username: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    roleId: string;
    role?: Role;
}