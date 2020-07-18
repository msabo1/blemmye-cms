import { Controller, Get } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './group.entity';
import { PrivilegeAuth } from '../auth/decorators/privilege-auth.decorator';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService){}

    @PrivilegeAuth('read', 'groups')
    @Get()
    async getAll(): Promise<Group[]>{
        return await this.groupsService.findAll();
    }
}
