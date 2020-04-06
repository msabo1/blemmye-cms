import { Role } from 'src/roles/entities/role.entity';
import { Group } from 'src/groups/group.entity';
import { Permission } from 'src/permissions/permission.entity';
import { RolePrivilege } from 'src/roles/entities/role-privilege.entity';
import { User } from '../users/user.entity';

export const entities = [
    Role,
    Group,
    Permission,
    RolePrivilege,
    User
];