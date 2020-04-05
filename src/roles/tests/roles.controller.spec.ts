import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from '../roles.controller';
import { RolesService } from '../roles.service';
import { QueryRoleDto } from '../dto/query-role.dto';
import { MockType } from '../../shared/types/mock.type';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

const mockRolesService: () => MockType<RolesService> = () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
});

describe('Roles Controller', () => {
  let controller: RolesController;
  let rolesService: MockType<RolesService>;

  let role: Role;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {provide: RolesService, useFactory: mockRolesService}
      ]
    }).compile();

    controller = module.get<RolesController>(RolesController);
    rolesService = module.get<RolesService, MockType<RolesService>>(RolesService);

    role = new Role();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('get', () => {
    it('should get roles from service and return them', async () => {
      const queryRoleDto: QueryRoleDto = new QueryRoleDto();
      const roles: Role[] = [role];
      rolesService.find.mockResolvedValue(roles);

      expect(rolesService.find).not.toBeCalled();
      expect(await controller.get(queryRoleDto)).toEqual(roles);
      expect(rolesService.find).toBeCalledWith(queryRoleDto);
    });
  });


  describe('getById', () => {
    it('should get role with given id from service and return it', async () => {
      const id: string = 'mock id';
      rolesService.findById.mockResolvedValue(role);

      expect(rolesService.findById).not.toBeCalled();
      expect(await controller.getById({id})).toEqual(role);
      expect(rolesService.findById).toBeCalledWith(id);
    });
  });


  describe('create', () => {
    it('should create new role using service and return it', async () => {
      const createRoleDto: CreateRoleDto = new CreateRoleDto();
      rolesService.create.mockResolvedValue(role);

      expect(rolesService.create).not.toBeCalled();
      expect(await controller.create(createRoleDto)).toEqual(role);
      expect(rolesService.create).toBeCalledWith(createRoleDto);
    });
  });


  describe('update', () => {
    it('should update role using service and return it', async () => {
      const id: string = 'mock id';
      const updateRoleDto: UpdateRoleDto = new UpdateRoleDto();
      rolesService.update.mockResolvedValue(role);

      expect(rolesService.update).not.toBeCalled();
      expect(await controller.update({id}, updateRoleDto)).toEqual(role);
      expect(rolesService.update).toBeCalledWith(id, updateRoleDto);
    });
  });


  describe('delete', () => {
    it('should delete role using service', async () => {
      const id: string = 'mock id';

      expect(rolesService.delete).not.toBeCalled();
      await controller.delete({id});
      expect(rolesService.delete).toBeCalledWith(id);
    });
  });
});
