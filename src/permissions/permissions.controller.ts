import { Controller, Get } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {

    constructor(private readonly permissionService: PermissionsService) {}

    @Get()
    async getAll(): Promise<Permission[]> {
        return await this.permissionService.findAll();
    }
}
