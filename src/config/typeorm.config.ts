import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'node-config-ts';

export const ormConfig: TypeOrmModuleOptions = {
  ...config.database.connection,
  entities: []
}