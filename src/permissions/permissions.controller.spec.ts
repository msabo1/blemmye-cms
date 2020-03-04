import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { async } from 'rxjs/internal/scheduler/async';
import { InternalServerErrorException, BadGatewayException } from '@nestjs/common';

const mockPermissionService = () => ({
  findAll: jest.fn()
});

describe('Permissions Controller', () => {
  let controller: PermissionsController;
  let permissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {provide: PermissionsService, useFactory: mockPermissionService}
      ]
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    permissionsService = module.get<PermissionsService>(PermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns all permissions using permissionService', async () => {
    let mockValue = "test value";
    permissionsService.findAll.mockResolvedValue(mockValue);

    expect(permissionsService.findAll).not.toBeCalled();
    let result = await controller.getAll();
    expect(permissionsService.findAll).toBeCalled();
    expect(result).toEqual(mockValue);
  });

  it('returns error object due to permissionService failure', async () => {
    permissionsService.findAll.mockImplementation(() => {throw new InternalServerErrorException});

    expect(controller.getAll()).rejects.toThrow(InternalServerErrorException);
  });
});
