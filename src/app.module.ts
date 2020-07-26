import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from 'nestjsx-automapper'
import * as ormConfig from './core/database/typeorm.config';
import { CoreModule } from './core/core.module';
import { PluginsModule } from './plugins/plugins.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AutomapperModule.withMapper(),
    CoreModule,
    PluginsModule,
  ]
})
export class AppModule {}
