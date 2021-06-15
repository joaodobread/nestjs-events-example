import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () =>
  <TypeOrmModuleOptions>{
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/../**/*.entity.{js,ts}`],
    synchronize: Boolean(process.env.DB_SYNC),
    logger: process.env.DB_LOGGER,
  };
