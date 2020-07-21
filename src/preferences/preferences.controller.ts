import { Controller, Get, Patch, Body } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { Preferences } from './preferences.entity';
import { PrivilegeAuth } from '../auth/decorators/privilege-auth.decorator';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Controller('preferences')
export class PreferencesController {
    constructor(private readonly preferencesService: PreferencesService){}

    @PrivilegeAuth('read', 'preferences')
    @Get()
    async get(): Promise<Preferences>{
        return await this.preferencesService.find();
    }

    @PrivilegeAuth('update', 'preferences')
    @Patch()
    async update(@Body() updatePreferencesDto: UpdatePreferencesDto){
        return await this.preferencesService.update(updatePreferencesDto);
    }
}
