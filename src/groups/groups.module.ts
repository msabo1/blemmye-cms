import { Module, forwardRef } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferencesModule } from '../preferences/preferences.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    PreferencesModule,
    forwardRef(() => RolesModule)
  ],
  providers: [GroupsService],
  controllers: [GroupsController],
  exports: [GroupsService]
})
export class GroupsModule {}
