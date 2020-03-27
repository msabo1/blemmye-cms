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
import { rejects } from 'assert';


const mockRoleRepository = () => ({
  findOne: jest.fn(),
  findWithQuery: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn()
});

const mockRolePrivilegeRepository = () => ({
  create: jest.fn(),
  remove: jest.fn()
});

const mockGroupsAndPermissionsService = () => ({
  areValid: jest.fn()
});

describe('RolesService', () => {
  let service: RolesService;
  let roleRepository, privilegeRepository, permissionsService, groupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {provide: RoleRepository, useFactory: mockRoleRepository},
        {provide: GroupsService, useFactory: mockGroupsAndPermissionsService},
        {provide: PermissionsService, useFactory: mockGroupsAndPermissionsService},
        {provide: getRepositoryToken(RolePrivilege), useFactory: mockRolePrivilegeRepository}
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    roleRepository = module.get(RoleRepository);
    privilegeRepository = module.get(getRepositoryToken(RolePrivilege));
    permissionsService = module.get(PermissionsService);
    groupsService = module.get(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    const query: QueryRoleDto = {search: 'mock search'};

    it('should get roles from repository and return them', async () => {
      const roles = 'mock roles';
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
      const role = 'mockRole';
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
    let mockCreateRoleDto;
    beforeEach(() => {
      mockCreateRoleDto = {
        privileges: null,
        name: 'mock name'
      };
    });
    

    it('should validate role privileges, create role using repository, save it and return it', async () => {
      mockCreateRoleDto.privileges = 'mock privileges';
      const mockPrivileges = [{
        permission: {
          name: 'mock permission'
        },
        group: {
          name: 'mock group'
        }
      }];
      const role = 'mock role';
      privilegeRepository.create.mockReturnValue(mockPrivileges);
      permissionsService.areValid.mockResolvedValue(true);
      groupsService.areValid.mockResolvedValue(true);
      roleRepository.create.mockReturnValue(role);

      expect(privilegeRepository.create).not.toBeCalled();
      expect(roleRepository.create).not.toBeCalled();
      expect(permissionsService.areValid).not.toBeCalled();
      expect(groupsService.areValid).not.toBeCalled();
      expect(roleRepository.save).not.toBeCalled();

      expect(await service.create(mockCreateRoleDto)).toEqual(role);
      expect(privilegeRepository.create).toBeCalledWith(mockCreateRoleDto.privileges);
      expect(roleRepository.create).toBeCalledWith(mockCreateRoleDto);
      expect(roleRepository.save).toBeCalledWith(role);
      
    });

    it('should not validate privileges and throw BadRequestException', async () => {
      mockCreateRoleDto.privileges = 'mock privileges';
      const mockPrivileges = [{
        permission: {
          name: 'mock permission'
        },
        group: {
          name: 'mock group'
        }
      }];
      privilegeRepository.create.mockReturnValue(mockPrivileges);
      permissionsService.areValid.mockResolvedValue(false);
      groupsService.areValid.mockResolvedValue(true);

      expect(privilegeRepository.create).not.toBeCalled();
      expect(permissionsService.areValid).not.toBeCalled();
      expect(groupsService.areValid).not.toBeCalled();

      await expect(service.create(mockCreateRoleDto)).rejects.toThrow(BadRequestException);
      expect(privilegeRepository.create).toBeCalledWith(mockCreateRoleDto.privileges);
      expect(roleRepository.create).not.toBeCalled();
      expect(roleRepository.save).not.toBeCalled();
    });

    it('should throw InternalServerErrorException', async () => {
      const role = 'mock role';
      roleRepository.save.mockRejectedValue(null);
      roleRepository.create.mockReturnValue(role);
  
      expect(roleRepository.save).not.toBeCalled();
      expect(roleRepository.create).not.toBeCalled();
  
      await expect(service.create(mockCreateRoleDto)).rejects.toThrow(InternalServerErrorException);
      expect(roleRepository.create).toBeCalledWith(mockCreateRoleDto);
      expect(roleRepository.save).toBeCalledWith(role);
    });
  });


  describe('update', () => {
    let mockFindById, id, role;
    beforeEach(() => {
      id = 'mock id';
      role = new Role();
      mockFindById = jest.spyOn(service, 'findById').mockResolvedValue(role);
    });

    it('should update roles name and privileges using repository, save it and return it', async () => {
      const mockUpdateDto = {
        name: 'mock name',
        privileges: []
      };

      const privilege: RolePrivilege = new RolePrivilege();

      const mockPrivileges: RolePrivilege[] = [privilege];
      privilegeRepository.create.mockReturnValue(mockPrivileges);
      permissionsService.areValid.mockResolvedValue(true);
      groupsService.areValid.mockResolvedValue(true);

      expect(mockFindById).not.toBeCalled();
      expect(privilegeRepository.create).not.toBeCalled();
      expect(permissionsService.areValid).not.toBeCalled();
      expect(groupsService.areValid).not.toBeCalled();
      expect(roleRepository.save).not.toBeCalled();

      role.name = mockUpdateDto.name;
      role.privileges = mockPrivileges;
      expect(await service.update(id, mockUpdateDto)).toEqual(role);
      expect(privilegeRepository.create).toBeCalledWith(mockUpdateDto.privileges);
      expect(roleRepository.save).toBeCalledWith(role);
      expect(mockFindById).toBeCalledWith(id);
    });

    it('sholud throw InternalServerErrorException', async () => {
      const mockUpdateDto = {};
      roleRepository.save.mockRejectedValue(null);

      expect(roleRepository.save).not.toBeCalled();
      await expect(service.update(id, mockUpdateDto)).rejects.toThrow(InternalServerErrorException);
      expect(mockFindById).toBeCalledWith(id);
      expect(roleRepository.save).toBeCalledWith(role);
    });
  });


  describe('delete', () => {
    const id = 'mock id';

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
