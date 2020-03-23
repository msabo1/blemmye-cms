import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePrivilege } from './entities/role-privilege.entity';
import { RoleRepository } from './role.repository';
import { PermissionsModule } from '../permissions/permissions.module';
import { GroupsModule } from '../groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleRepository, RolePrivilege]),
    PermissionsModule,
    GroupsModule
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}
