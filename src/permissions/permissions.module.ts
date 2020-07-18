import { Module, forwardRef } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { RolesModule } from '../roles/roles.module';
import { PreferencesModule } from '../preferences/preferences.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => RolesModule),
    PreferencesModule
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService]
})
export class PermissionsModule {}
