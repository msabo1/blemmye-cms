import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
    constructor(@InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>) {}

    async findAll(): Promise<Permission[]> {
        try{
            let permissions: Permission[] = await this.permissionRepository.find();
            return permissions;
        }catch(error){
            throw new InternalServerErrorException;
        }
        
    }
}
