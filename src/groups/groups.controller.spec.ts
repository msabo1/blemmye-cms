import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { InternalServerErrorException } from '@nestjs/common';

const mockGroupsService = () => ({
  findAll: jest.fn()
});

describe('Groups Controller', () => {
  let controller: GroupsController;
  let groupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        {provide: GroupsService, useFactory: mockGroupsService}
      ]
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    groupsService = module.get(GroupsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns all groups using groups service', async () => {
    const mockValue = "test value";
    groupsService.findAll.mockResolvedValue(mockValue);

    expect(groupsService.findAll).not.toBeCalled();
    const result = await groupsService.findAll();
    expect(result).toEqual(mockValue);
    expect(groupsService.findAll).toBeCalled();
  });

  it('throws InternalServerErrorException', async () => {
    groupsService.findAll.mockImplementation(() => {throw new InternalServerErrorException});

    expect(groupsService.findAll).not.toBeCalled();
    expect(controller.getAll()).rejects.toThrow(InternalServerErrorException);
    expect(groupsService.findAll).toBeCalled
  });
});
