import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {UserProfile} from './user.profile';
import {JwtModule} from '@nestjs/jwt'
import {config} from 'node-config-ts'
import { AuthModule } from '../auth/auth.module';
import { PreferencesModule } from '../preferences/preferences.module';
import { RolesModule } from '../roles/roles.module';

UserProfile;
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: {expiresIn: config.jwt.expiresIn}
    }),
    PreferencesModule,
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
