import { config } from 'node-config-ts';
import { entities } from './entities'
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig: TypeOrmModuleOptions = {
  ...config.database.connection,
  entities,
  migrations: [__dirname + './migrations/*.ts']
};

export = ormConfig;