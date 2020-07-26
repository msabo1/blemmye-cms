import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from '../permissions.service';
import { Permission } from '../permission.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { MockType } from '../../shared/types/mock.type';
import { Repository } from 'typeorm';

const mockPermissionRepository: () => MockType<Repository<Permission>> = () => ({
  find: jest.fn()
});

describe('PermissionsService', () => {
  let service: PermissionsService;
  let permissionRepository: MockType<Repository<Permission>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        { provide: getRepositoryToken(Permission) , useFactory: mockPermissionRepository }
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    permissionRepository = module.get<Repository<Permission>, MockType<Repository<Permission>>>(getRepositoryToken(Permission));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('gets all permissions from repository', async () => {
      const permissions: Permission[] = [new Permission]
      permissionRepository.find.mockResolvedValue(permissions);
  
      expect(permissionRepository.find).not.toBeCalled();
      expect(await service.findAll()).toEqual(permissions);;
      expect(permissionRepository.find).toBeCalled();
    });
  
    it('throws InternalServerErrorException', async () => {
      permissionRepository.find.mockRejectedValue(null);
  
      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
      expect(permissionRepository.find).toBeCalled();
  
    });
  });
  


});
