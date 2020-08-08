import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Preferences } from './preferences.entity';
import { Repository } from 'typeorm';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class PreferencesService {
    constructor(@InjectRepository(Preferences) private readonly preferencesRepository: Repository<Preferences>){}

    async find(): Promise<Preferences>{
        try{
            return await this.preferencesRepository.findOne(null, {relations: ['defaultRole', 'visitorRole']});
        }catch(error){
            throw new InternalServerErrorException;
        }
        
    }

    async update(updatePreferencesDto: UpdatePreferencesDto): Promise<Preferences>{
        let preferences: Preferences = await this.preferencesRepository.findOne();
        preferences = this.preferencesRepository.create({...preferences, ...updatePreferencesDto});
        try{
            await this.preferencesRepository.save(preferences);
        }catch{
            throw new InternalServerErrorException;
        }

        return preferences;
    }
}
