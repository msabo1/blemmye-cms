import { Role } from 'src/roles/role.entity';
import { Group } from 'src/roles/group.entity';
import { Permission } from 'src/roles/permission.entity';
import { RolePrivilege } from 'src/roles/role-privilege';

export const entities = [
    Role,
    Group,
    Permission,
    RolePrivilege
];