import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join, resolve } from 'path';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  entities: [
    resolve(__dirname, '..', '..', '**', 'entities', '*.entity.{ts,js}'),
  ],
  migrations: [resolve(__dirname, '..', 'migrations', '*.{ts,js}')],
  cli: {
    migrationsDir: join('src', 'typeorm', 'migrations'),
  },
};

module.exports = options;
