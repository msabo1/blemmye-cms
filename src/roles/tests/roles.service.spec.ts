import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../roles.service';
import { RoleRepository } from '../role.repository';
import { GroupsService } from '../../groups/groups.service';
import { PermissionsService } from '../../permissions/permissions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolePrivilege } from '../entities/role-privilege.entity';
import { QueryRoleDto } from '../dto/query-role.dto';
import { InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { MockType } from '../../shared/types/mock.type';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

const mockRoleRepository: () => MockType<RoleRepository> = () => ({
  findOne: jest.fn(),
  findWithQuery: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn()
});

const mockRolePrivilegeRepository: () => MockType<Repository<RolePrivilege>> = () => ({
  create: jest.fn(),
  remove: jest.fn()
});

const mockGroupsService: () => MockType<GroupsService> = () => ({
  areValid: jest.fn()
});

const mockPermissionsService: () => MockType<PermissionsService> = () => ({
  areValid: jest.fn()
});

describe('RolesService', () => {
  let service: RolesService;
  let roleRepository: MockType<RoleRepository>;
  let privilegeRepository: MockType<Repository<RolePrivilege>>;
  let permissionsService: MockType<PermissionsService>;
  let groupsService: MockType<PermissionsService>;

  let role: Role;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {provide: RoleRepository, useFactory: mockRoleRepository},
        {provide: GroupsService, useFactory: mockGroupsService},
        {provide: PermissionsService, useFactory: mockPermissionsService},
        {provide: getRepositoryToken(RolePrivilege), useFactory: mockRolePrivilegeRepository}
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    roleRepository = module.get<RoleRepository, MockType<RoleRepository>>(RoleRepository);
    privilegeRepository = module.get<Repository<RolePrivilege>, MockType<Repository<RolePrivilege>>>(getRepositoryToken(RolePrivilege));
    permissionsService = module.get<PermissionsService, MockType<PermissionsService>>(PermissionsService);
    groupsService = module.get<GroupsService, MockType<GroupsService>>(GroupsService);

    role = new Role();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    const query: QueryRoleDto = {search: 'mock search'};

    it('should get roles from repository and return them', async () => {
      const roles:Role[] = [role]
      roleRepository.findWithQuery.mockResolvedValue(roles);

      expect(roleRepository.findWithQuery).not.toBeCalled();
      expect(await service.find(query)).toEqual(roles);
      expect(roleRepository.findWithQuery).toBeCalledWith(query);
    });

    it('should throw InternalServerErrorException', async () => {
      roleRepository.findWithQuery.mockRejectedValue(null);

      expect(roleRepository.findWithQuery).not.toBeCalled();
      await expect(service.find(query)).rejects.toThrow(InternalServerErrorException);
      expect(roleRepository.findWithQuery).toBeCalledWith(query);
    });
  });

  describe('findById', () => {
    const id: string = 'mock id';

    it('should get role from repository and return it', async () => {
      roleRepository.findOne.mockResolvedValue(role);

      expect(roleRepository.findOne).not.toBeCalled();
      expect(await service.findById(id)).toEqual(role);
      expect(roleRepository.findOne).toBeCalledWith(id);
    });

    it('should not get role from repository and throw NotFoundException', async () => {
      roleRepository.findOne.mockResolvedValue(null);

      expect(roleRepository.findOne).not.toBeCalled();
      await expect(service.findById(id)).rejects.toThrow(NotFoundException);
      expect(roleRepository.findOne).toBeCalledWith(id);
    });

    it('should throw InternalServerErrorException', async () => {
      roleRepository.findOne.mockRejectedValue(null);

      expect(roleRepository.findOne).not.toBeCalled();
      await expect(service.findById(id)).rejects.toThrow(InternalServerErrorException);
      expect(roleRepository.findOne).toBeCalledWith(id);
    });
  });

  describe('create', () => {
    let createRoleDto: CreateRoleDto;
    beforeEach(() => {
      createRoleDto = new CreateRoleDto();
    });
    

    it('should validate role privileges, create role using repository, save it and return it', async () => {
      createRoleDto.privileges = [];
      const privileges: RolePrivilege[] = [new RolePrivilege()];
      privilegeRepository.create.mockReturnValue(privileges);
      permissionsService.areValid.mockResolvedValue(true);
      groupsService.areValid.mockResolvedValue(true);
      roleRepository.create.mockReturnValue(role);

      expect(privilegeRepository.create).not.toBeCalled();
      expect(roleRepository.create).not.toBeCalled();
      expect(permissionsService.areValid).not.toBeCalled();
      expect(groupsService.areValid).not.toBeCalled();
      expect(roleRepository.save).not.toBeCalled();

      expect(await service.create(createRoleDto)).toEqual(role);
      expect(privilegeRepository.create).toBeCalledWith(createRoleDto.privileges);
      expect(roleRepository.create).toBeCalledWith(createRoleDto);
      expect(roleRepository.save).toBeCalledWith(role);
      
    });

    it('should not validate privileges and throw BadRequestException', async () => {
      createRoleDto.privileges = [];
      const privileges: RolePrivilege[] = [new RolePrivilege()];
      privilegeRepository.create.mockReturnValue(privileges);
      permissionsService.areValid.mockResolvedValue(false);
      groupsService.areValid.mockResolvedValue(true);

      expect(privilegeRepository.create).not.toBeCalled();
      expect(permissionsService.areValid).not.toBeCalled();
      expect(groupsService.areValid).not.toBeCalled();

      await expect(service.create(createRoleDto)).rejects.toThrow(BadRequestException);
      expect(privilegeRepository.create).toBeCalledWith(createRoleDto.privileges);
      expect(roleRepository.create).not.toBeCalled();
      expect(roleRepository.save).not.toBeCalled();
    });

    it('should throw InternalServerErrorException', async () => {
      roleRepository.save.mockRejectedValue(null);
      roleRepository.create.mockReturnValue(role);
  
      expect(roleRepository.save).not.toBeCalled();
      expect(roleRepository.create).not.toBeCalled();
  
      await expect(service.create(createRoleDto)).rejects.toThrow(InternalServerErrorException);
      expect(roleRepository.create).toBeCalledWith(createRoleDto);
      expect(roleRepository.save).toBeCalledWith(role);
    });
  });


  describe('update', () => {
    let mockFindById: jest.SpyInstance;
    let id: string;
    beforeEach(() => {
      id = 'mock id';
      mockFindById = jest.spyOn(service, 'findById').mockResolvedValue(role);
    });

    it('should update roles name and privileges using repository, save it and return it', async () => {
      const updateRoleDto:UpdateRoleDto = new UpdateRoleDto();
      updateRoleDto.privileges = [];

      const privileges: RolePrivilege[] = [new RolePrivilege];
      privilegeRepository.create.mockReturnValue(privileges);
      permissionsService.areValid.mockResolvedValue(true);
      groupsService.areValid.mockResolvedValue(true);

      expect(mockFindById).not.toBeCalled();
      expect(privilegeRepository.create).not.toBeCalled();
      expect(permissionsService.areValid).not.toBeCalled();
      expect(groupsService.areValid).not.toBeCalled();
      expect(roleRepository.save).not.toBeCalled();

      role.name = updateRoleDto.name;
      role.privileges = privileges;
      expect(await service.update(id, updateRoleDto)).toEqual(role);
      expect(privilegeRepository.create).toBeCalledWith(updateRoleDto.privileges);
      expect(roleRepository.save).toBeCalledWith(role);
      expect(mockFindById).toBeCalledWith(id);
    });

    it('sholud throw InternalServerErrorException', async () => {
      const updateRoleDto:UpdateRoleDto = new UpdateRoleDto();
      roleRepository.save.mockRejectedValue(null);

      expect(roleRepository.save).not.toBeCalled();
      await expect(service.update(id, updateRoleDto)).rejects.toThrow(InternalServerErrorException);
      expect(mockFindById).toBeCalledWith(id);
      expect(roleRepository.save).toBeCalledWith(role);
    });
  });


  describe('delete', () => {
    const id: string = 'mock id';

    it('should delete role with given id using repository', async () => {
      expect(roleRepository.delete).not.toBeCalled();
      await service.delete(id);
      expect(roleRepository.delete).toBeCalledWith(id);
    });

    it('should throw InternalServerErrorException', async () => {
      roleRepository.delete.mockRejectedValue(null);
      expect(roleRepository.delete).not.toBeCalled();
      await expect(service.delete(id)).rejects.toThrow(InternalServerErrorException);
      expect(roleRepository.delete).toBeCalledWith(id);
    });
  });
});
