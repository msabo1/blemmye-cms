import { Module, forwardRef } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Preferences } from './preferences.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Preferences]),
    forwardRef(() => RolesModule)
],
  controllers: [PreferencesController],
  providers: [PreferencesService],
  exports: [PreferencesService]
})
export class PreferencesModule {}
