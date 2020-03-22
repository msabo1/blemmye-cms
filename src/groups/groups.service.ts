import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

    async areValid(groups: Group[]): Promise<boolean>{
        const validGroups: string[] = (await this.findAll()).map((group: Group): string => group.name);
        for(let group of groups){
            if(!validGroups.includes(group.name)){
                return false;
            }
        }
        return true;
    }
}
