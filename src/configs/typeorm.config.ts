import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'DataBase',
  port: 5432,
  username: 'test',
  password: '1234',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
  // logging: 'all',
};
