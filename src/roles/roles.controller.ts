import { Controller, Get, Param, Post, Body, Query, UsePipes, ValidationPipe, Patch } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
@UsePipes(new ValidationPipe({transform: true}))
export class RolesController {
    constructor(private readonly rolesService: RolesService){}

    @Get()
    async get(@Query() queryRoleDto: QueryRoleDto): Promise<Role[]>{
        return await this.rolesService.find(queryRoleDto);
    }

    @Get(':id')
    async getById(@Param() {id}: GetRoleDto): Promise<Role>{
        return await this.rolesService.findById(id);
    }

    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role>{
        return await this.rolesService.create(createRoleDto);
    }

    @Patch(':id')
    async update(@Param() {id}: GetRoleDto, @Body() updateRoleDto: UpdateRoleDto): Promise<Role>{
        console.log(updateRoleDto)
        return await this.rolesService.update(id, updateRoleDto);
    }
}
