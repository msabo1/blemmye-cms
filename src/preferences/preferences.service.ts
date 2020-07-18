import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Preferences } from './preferences.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PreferencesService {
    constructor(@InjectRepository(Preferences) private readonly preferencesRepository: Repository<Preferences>){}

    async find(): Promise<Preferences>{
        return await this.preferencesRepository.findOne();
    }
}
