import { Controller, Get } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';
import { PrivilegeAuth } from '../auth/decorators/privilege-auth.decorator';

@Controller('permissions')
export class PermissionsController {

    constructor(private readonly permissionService: PermissionsService) {}

    @PrivilegeAuth('read', 'permissions')
    @Get()
    async getAll(): Promise<Permission[]> {
        return await this.permissionService.findAll();
    }
}
