import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector, ModuleRef } from '@nestjs/core';
import { RolesService } from '../../roles/roles.service';
import { User } from '../../users/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { RolePrivilege } from '../../roles/entities/role-privilege.entity';
import { Privilege } from '../../roles/models/privilege.model';
import { PreferencesService } from '../../preferences/preferences.service';
import { Preferences } from '../../preferences/preferences.entity';

@Injectable()
export class PrivilegeGuard implements CanActivate {
    constructor(
        private readonly preferencesService: PreferencesService,
        private readonly rolesService: RolesService,
        private reflector: Reflector,
        @InjectMapper() private readonly mapper: AutoMapper,
        ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        const privilege: RolePrivilege = this.mapper.map(this.reflector.get<Privilege>('privilege', context.getHandler()), RolePrivilege, Privilege) ;
        let role: Role;
        if(!user){
            const preferences: Preferences = await this.preferencesService.find();
            role = await this.rolesService.findById(preferences.visitorRoleId);
        }else{
            role = await this.rolesService.findById(user.roleId);
        }

        if(!role.hasPrivilege(privilege)){
            throw new UnauthorizedException();
        }
        return true;
    }
}