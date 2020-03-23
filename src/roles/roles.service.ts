import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { RoleRepository } from './role.repository';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolePrivilege } from './role-privilege';
import { Repository } from 'typeorm';
import { GroupsService } from '../groups/groups.service';
import { PermissionsService } from '../permissions/permissions.service';
import { Permission } from '../permissions/permission.entity';
import { Group } from '../groups/group.entity';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role) private readonly roleRepository: RoleRepository,
        @InjectRepository(RolePrivilege) private readonly privilegeRepository: Repository<RolePrivilege>,
        private readonly groupsService: GroupsService,
        private readonly permissionsService: PermissionsService
        ){}


    /**
     * 
     * Returns all roles meeting query requirements.
     * If query is empty, returns all roles.
     * If there is no roles stored, returns empty array.
     */
    async find(queryRoleDto: QueryRoleDto): Promise<Role[]>{
        try{
            let roles: Role[];
            roles = await this.roleRepository.findWithQuery(queryRoleDto);
            return roles;
        }catch(error){
            throw new InternalServerErrorException;
        }
    }

    /**
     * Returns role with given id.
     * If such role doesn't exist, throws NotFoundException
     */
    async findById(id: string): Promise<Role>{
        let role: Role;
        try{
            role = await this.roleRepository.findOne(id);
        }catch(error){
            throw new InternalServerErrorException;
        }

        if(!role){
            throw new NotFoundException;
        }
        return role;
    }

    /**
     * Stores role with given properites in database and returns that role with
     * generated ID and timestamps.
     * If privileges are given, validates them.
     */
    async create(createRoleDto: CreateRoleDto): Promise<Role>{
        if(createRoleDto.privileges){
            const privileges: RolePrivilege[] = this.privilegeRepository.create(createRoleDto.privileges);
            await this.validatePrivileges(privileges);
        }
        
        const role: Role = this.roleRepository.create(createRoleDto);
        try{
            await this.roleRepository.save(role);
        }catch(error){
            throw new InternalServerErrorException;
        }
        
        return role;
    }

    /**
     * Updates role with given id with given properties and returns updated role.
     * If privileges are given, validates them.
     */
    async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>{
        const {name, privileges} = updateRoleDto;
        const role: Role = await this.findById(id);

        if(name){
            role.name = name;
        }
        if(privileges){
            const newPrivileges: RolePrivilege[] = this.privilegeRepository.create(privileges);
            await this.validatePrivileges(newPrivileges);
            await this.filterPrivileges(role, newPrivileges)
            role.privileges = newPrivileges;
        }
        
        try{
            await this.roleRepository.save(role);
        }catch(error){
            throw new InternalServerErrorException;
        }
        
        return role;
    }

    /**
     * Deletes role with given id from database.
     * Doesn't check if role exists.
     */
    async delete(id: string): Promise<void>{
        try{
            await this.roleRepository.delete(id);
        }catch(error){
            throw new InternalServerErrorException;
        }
        
    }

    /**
     * This routine is necessary due to typeorm limitations. Typeorm doesn't remove relations cascadely.
     * If there are privileges of given role that are not in given new privileges, this method deletes
     * them from the database.
     */
    private async filterPrivileges(role: Role, newPrivileges: RolePrivilege[]): Promise<void>{
        const newPrivilegesSet: Set<RolePrivilege> = new Set(newPrivileges);
        const privilegesToRemove: RolePrivilege[] = role.privileges.filter((privilege: RolePrivilege) => !newPrivilegesSet.has(privilege));
        privilegesToRemove.forEach((privilege: RolePrivilege) => privilege.role = role);
        try{
            if(privilegesToRemove.length > 0){
                await this.privilegeRepository.remove(privilegesToRemove);
            }
        }catch(error){
            throw new InternalServerErrorException;
        }   
    }

    /**
     * Checks if permissions and groups of all privileges exist in database.
     * Throws BadRequestException if some of given privileges are not valid.
     */
    private async validatePrivileges(privileges: RolePrivilege[]): Promise<void>{
        const permissions: Permission[] = privileges.map((privilege: RolePrivilege): Permission => privilege.permission);
        const groups: Group[] = privileges.map((privilege: RolePrivilege): Group => privilege.group);

        if(!(await this.permissionsService.areValid(permissions)) || !(await this.groupsService.areValid(groups))){
            throw new BadRequestException('One or more privileges are not valid!');
        }
    }
}
