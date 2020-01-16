import { Role } from 'src/roles/role.entity';
import { Group } from 'src/groups/group.entity';
import { Permission } from 'src/permissions/permission.entity';
import { RolePrivilege } from 'src/roles/role-privilege';

export const entities = [
    Role,
    Group,
    Permission,
    RolePrivilege
];