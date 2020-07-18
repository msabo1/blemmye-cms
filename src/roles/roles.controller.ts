import { Controller, Get, Param, Post, Body, Query, UsePipes, ValidationPipe, Patch, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { GetRoleDto } from './dto/get-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrivilegeAuth } from '../auth/decorators/privilege-auth.decorator';

@Controller('roles')
@UsePipes(new ValidationPipe({transform: true}))
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
    @Get(':id')
    async getById(@Param() {id}: GetRoleDto): Promise<Role>{
        return await this.rolesService.findById(id);
    }

    /** 
     * Creates new role with given properties.
     * Validates properties.
     * Returns created role.
    */
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto): Promise<Role>{
        return await this.rolesService.create(createRoleDto);
    }

    /** 
     * Updates role with given id with given properites.
     * Validates id and properties.
     * Returns updated role.
    */
    @Patch(':id')
    async update(@Param() {id}: GetRoleDto, @Body() updateRoleDto: UpdateRoleDto): Promise<Role>{
        return await this.rolesService.update(id, updateRoleDto);
    }

    /** 
     * Deletes role with given id.
    */
    @Delete(':id')
    async delete(@Param() {id}: GetRoleDto): Promise<void>{
        await this.rolesService.delete(id);
    }
}
