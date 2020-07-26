import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from '.././groups.service';
import { Group } from '.././group.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { MockType } from '../../shared/types/mock.type';
import { Repository } from 'typeorm';

const mockGroupRepository: () => MockType<Repository<Group>> = () => ({
  find: jest.fn()
});

describe('GroupsService', () => {
  let service: GroupsService;
  let groupRepository: MockType<Repository<Group>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        { provide: getRepositoryToken(Group) , useFactory: mockGroupRepository }
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    groupRepository = module.get<Repository<Group>, MockType<Repository<Group>>>(getRepositoryToken(Group));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('gets all groups from repository', async () => {
      const groups: Group[] = [new Group]
      groupRepository.find.mockResolvedValue(groups);
  
      expect(groupRepository.find).not.toBeCalled();
      expect(await service.findAll()).toEqual(groups);;
      expect(groupRepository.find).toBeCalled();
    });
  
    it('throws InternalServerErrorException', async () => {
      groupRepository.find.mockRejectedValue(null);
  
      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
      expect(groupRepository.find).toBeCalled();
  
    });
  });
  


});
