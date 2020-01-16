import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'node-config-ts';
import { entities } from './entities'

export const ormConfig: TypeOrmModuleOptions = {
  ...config.database.connection,
  entities,
  migrations: ['./migrations/*.ts']
}