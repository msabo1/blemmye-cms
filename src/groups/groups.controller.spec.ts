import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { MockType } from '../shared/types/mock.type';
import { Group } from './group.entity';

const mockGroupService: () => MockType<GroupsService> = () => ({
  findAll: jest.fn()
});

describe('Groups Controller', () => {
  let controller: GroupsController;
  let groupsService: MockType<GroupsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        {provide: GroupsService, useFactory: mockGroupService}
      ]
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    groupsService = module.get<GroupsService, MockType<GroupsService>>(GroupsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns all groups using groupService', async () => {
    const groups: Group[] = [new Group()]
    groupsService.findAll.mockResolvedValue(groups);

    expect(groupsService.findAll).not.toBeCalled();
    expect(await controller.getAll()).toEqual(groups);
    expect(groupsService.findAll).toBeCalled();
  });
});
