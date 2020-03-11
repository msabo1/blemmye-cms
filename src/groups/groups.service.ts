import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Group } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {

    constructor(@InjectRepository(Group) private readonly groupRepository: Repository<Group>){}

    async findAll(): Promise<Group[]>{
        try{
            const groups: Group[] = await this.groupRepository.find();
            return groups;
        }catch(error){
            throw new InternalServerErrorException;
        }
    }
}
