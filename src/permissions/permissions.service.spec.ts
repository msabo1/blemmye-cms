import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';

const mockPermissionRepository = () => ({
  find: jest.fn()
});

describe('PermissionsService', () => {
  let service: PermissionsService;
  let permissionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        { provide: getRepositoryToken(Permission) , useFactory: mockPermissionRepository }
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    permissionRepository = module.get(getRepositoryToken(Permission));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gets all permissions from repository', async () => {
    let mockValue = 'test value';
    permissionRepository.find.mockResolvedValue(mockValue);

    expect(permissionRepository.find).not.toBeCalled();
    let result = await service.findAll();
    expect(permissionRepository.find).toBeCalled();
    expect(result).toEqual(mockValue);
  });

  it('throws InternalServerErrorException', async () => {
    permissionRepository.find.mockRejectedValue(null);

    expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    expect(permissionRepository.find).toBeCalled();

  });


});
