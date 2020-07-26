import { Module } from '@nestjs/common';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';
import { PreferencesModule } from './preferences/preferences.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { PagesModule } from './pages/pages.module';

@Module({
    imports: [
        RolesModule,
        GroupsModule,
        PermissionsModule,
        UsersModule,
        PreferencesModule,
        AuthModule,
        BlogModule,
        PagesModule
    ]
})
export class CoreModule {}
