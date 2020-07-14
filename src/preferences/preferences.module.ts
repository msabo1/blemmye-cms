import { Module } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Preferences } from './preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Preferences])],
  controllers: [PreferencesController],
  providers: [PreferencesService]
})
export class PreferencesModule {}
