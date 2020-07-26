import { Role } from 'src/roles/entities/role.entity';
import { Group } from 'src/groups/group.entity';
import { Permission } from 'src/permissions/permission.entity';
import { RolePrivilege } from 'src/roles/entities/role-privilege.entity';
import { User } from '../users/user.entity';
import { Preferences } from '../preferences/preferences.entity';
import { Post } from '../blog/posts/entities/post.entity';
import { Tag } from '../blog/posts/entities/tag.entity';
import { Category } from '../blog/categories/category.entity';
import { Comment } from "../blog/comments/comment.entity";

export const entities = [
    Role,
    Group,
    Permission,
    RolePrivilege,
    User,
    Preferences,
    Post,
    Tag,
    Category,
    Comment
];