import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'node-config-ts';
import { entities } from '../ormentities'

export const ormConfig: TypeOrmModuleOptions = {
  ...config.database.connection,
  entities
}