import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { MockType } from '../shared/types/mock.type';
import { Permission } from './permission.entity';

const mockPermissionService: () => MockType<PermissionsService> = () => ({
  findAll: jest.fn()
});

describe('Permissions Controller', () => {
  let controller: PermissionsController;
  let permissionsService: MockType<PermissionsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        {provide: PermissionsService, useFactory: mockPermissionService}
      ]
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    permissionsService = module.get<PermissionsService, MockType<PermissionsService>>(PermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns all permissions using permissionService', async () => {
    const permissions: Permission[] = [new Permission()]
    permissionsService.findAll.mockResolvedValue(permissions);

    expect(permissionsService.findAll).not.toBeCalled();
    expect(await controller.getAll()).toEqual(permissions);
    expect(permissionsService.findAll).toBeCalled();
  });
});
