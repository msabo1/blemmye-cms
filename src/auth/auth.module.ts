import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RolesModule } from '../roles/roles.module';
import { PreferencesModule } from '../preferences/preferences.module';
import { JwtStrategy } from './jwt.strategy';
import { PrivilegeGuard } from './guards/privilege.guard';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        PassportModule,
        RolesModule,
        PreferencesModule,
        UsersModule
    ],
    providers: [JwtStrategy, PrivilegeGuard],
    exports: [
        JwtStrategy,
        PrivilegeGuard,
        PreferencesModule,
        RolesModule
    ]
})
export class AuthModule {}
