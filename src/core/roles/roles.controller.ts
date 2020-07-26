import { Controller, Get, Param, Post, Body, Query, UsePipes, ValidationPipe, Patch, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { Id } from '../shared/models/id.model';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrivilegeAuth } from '../auth/decorators/privilege-auth.decorator';

@Controller('roles')
@UsePipes(new ValidationPipe({transform: true, whitelist: true, forbidNonWhitelisted: true}))
export class RolesController {
    constructor(private readonly rolesService: RolesService){}

    /**
     * Returns all roles matching query properties.
     * If query is empty, returns all roles.
     * Validates query properties.
     */
    @PrivilegeAuth('read', 'roles')
    @Get()
    async get(@Query() queryRoleDto: QueryRoleDto): Promise<Role[]>{
        return await this.rolesService.find(queryRoleDto);
    }

    /** 
     * Returns role with given id, if exists.
     * Validates id.
    */
    @PrivilegeAuth('read', 'roles')
    @Get(':id')
    async getById(@Param() {id}: Id): Promise<Role>{
        return await this.rolesService.findById(id);
    }

    /** 
     * Creates new role with given properties.
     * Validates properties.
     * Returns created role.
    */
    @PrivilegeAuth('create', 'roles')
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role>{
        return await this.rolesService.create(createRoleDto);
    }

    /** 
     * Updates role with given id with given properites.
     * Validates id and properties.
     * Returns updated role.
    */
    @PrivilegeAuth('update', 'roles')
    @Patch(':id')
    async update(@Param() {id}: Id, @Body() updateRoleDto: UpdateRoleDto): Promise<Role>{
        return await this.rolesService.update(id, updateRoleDto);
    }

    /** 
     * Deletes role with given id.
    */
    @PrivilegeAuth('delete', 'roles')
    @Delete(':id')
    async delete(@Param() {id}: Id): Promise<void>{
        await this.rolesService.delete(id);
    }
}
