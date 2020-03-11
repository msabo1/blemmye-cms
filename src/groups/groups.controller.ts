import { Controller, Get } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './group.entity';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService){}

    @Get()
    async getAll(): Promise<Group[]>{
        return await this.groupsService.findAll();
    }
}
