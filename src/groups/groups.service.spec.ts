import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { InternalServerErrorException } from '@nestjs/common';

const mockGroupRepository = () => ({
  find: jest.fn()
})

describe('GroupsService', () => {
  let service: GroupsService;
  let groupRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {provide: getRepositoryToken(Group), useFactory: mockGroupRepository}
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    groupRepository = module.get(getRepositoryToken(Group));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gets all groups from repository', async () => {
    const mockValue = "test value";
    groupRepository.find.mockResolvedValue(mockValue);

    expect(groupRepository.find).not.toBeCalled();
    const result = await service.findAll();
    expect(groupRepository.find).toBeCalled();
    expect(result).toEqual(mockValue);
  });

  it('thows InternalServerErrorException', async () => {
    groupRepository.find.mockRejectedValue(null);

    expect(groupRepository.find).not.toBeCalled();
    expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    expect(groupRepository.find).toBeCalled();
  });
});
