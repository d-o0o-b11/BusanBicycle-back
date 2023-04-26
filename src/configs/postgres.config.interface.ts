import { DatabaseType } from 'typeorm';

export interface IsDatabaseConfig {
  type: DatabaseType;
  // NOED_ENV: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
