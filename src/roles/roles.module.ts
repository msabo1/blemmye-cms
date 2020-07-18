import { Module, forwardRef } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePrivilege } from './entities/role-privilege.entity';
import { RoleRepository } from './role.repository';
import { PermissionsModule } from '../permissions/permissions.module';
import { GroupsModule } from '../groups/groups.module';
import { RolePrivilegeProfile } from './role-privilege.profile';
import { AuthModule } from '../auth/auth.module';
import { PreferencesModule } from '../preferences/preferences.module';

RolePrivilegeProfile

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository, RolePrivilege]),
    PermissionsModule,
    GroupsModule,
    PreferencesModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
