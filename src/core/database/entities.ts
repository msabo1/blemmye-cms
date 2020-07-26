import { Role } from '../roles/entities/role.entity';
import { User } from '../users/user.entity';
import { Preferences } from '../preferences/preferences.entity';
import { Post } from '../blog/posts/entities/post.entity';
import { Tag } from '../blog/posts/entities/tag.entity';
import { Category } from '../blog/categories/category.entity';
import { Comment } from "../blog/comments/comment.entity";
import { Page } from '../pages/page.entity';
import { Group } from '../groups/group.entity';
import { Permission } from '../permissions/permission.entity';
import { RolePrivilege } from '../roles/entities/role-privilege.entity';

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
    Comment,
    Page
];