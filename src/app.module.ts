import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from 'nestjsx-automapper'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormConfig from './database/typeorm.config';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';
import { PreferencesModule } from './preferences/preferences.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AutomapperModule.withMapper(),
    RolesModule,
    GroupsModule,
    PermissionsModule,
    UsersModule,
    PreferencesModule,
    AuthModule,
    BlogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
