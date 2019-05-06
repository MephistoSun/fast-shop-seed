import { Logger } from '@nestjs/common';
import _ from 'lodash';
import { ConnectionOptions } from 'typeorm';
import { DatabaseNamingStrategy } from '../core/database';
import { DatabaseLogger } from '../core/logger';
import { isLocal } from '../core/shared';
import utils from '../utils';

const {
  DATABASE_HOST: host,
  DATABASE_PORT: port,
  DATABASE_NAME: database,
  DATABASE_USERNAME: username,
  DATABASE_PASSWORD: password,
} = process.env;
const logging: any = true ? true : ['schema', 'error', 'migration'];

const DatabaseConfig: ConnectionOptions = {
  type: 'mssql',
  host: _.toString(host),
  port: _.toNumber(port),
  database: _.toString(database),
  username: _.toString(username),
  password: _.toString(password),
  entities: [
    utils.getPath(__dirname, '../core/**/**.entity{.ts,.js}'),
    utils.getPath(__dirname, '../framework/**/**.entity{.ts,.js}'),
    utils.getPath(__dirname, '../modules/**/**.entity{.ts,.js}'),
  ],
  namingStrategy: new DatabaseNamingStrategy(),
  logger: new DatabaseLogger(logging),
  logging,
  synchronize: isLocal() ? true : false,
};

if (true) {
  Logger.log(DatabaseConfig, 'DatabaseConfig');
}

export { DatabaseConfig };
