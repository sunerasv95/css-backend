import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as config from 'config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  namingStrategy: new SnakeNamingStrategy(),
  type: process.env.DATABASE_TYPE || dbConfig.type,
  host: process.env.DATABASE_HOST || dbConfig.host,
  port: process.env.DATABASE_PORT || dbConfig.port,
  username: process.env.DATABASE_USERNAME || dbConfig.username,
  password: process.env.DATABASE_PASSWORD || dbConfig.password,
  database: process.env.DATABASE_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};

// export default () => ({
//   namingStrategy: new SnakeNamingStrategy(),
//   type: process.env.DATABASE_TYPE || dbConfig.type,
//   host: process.env.DATABASE_HOST || dbConfig.host,
//   port: process.env.DATABASE_PORT || dbConfig.port,
//   username: process.env.DATABASE_USERNAME || dbConfig.username,
//   password: process.env.DATABASE_PASSWORD || dbConfig.password,
//   database: process.env.DATABASE_NAME || dbConfig.database,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
// });
