import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './database/typeorm.config';
import { RolesModule } from './roles/roles.module';
import { GroupsModule } from './groups/groups.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    RolesModule,
    GroupsModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
