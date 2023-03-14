import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'DataBase',
      port: 5432,
      username: 'test',
      password: '1234',
      database: 'postgres',
      // extra: {
      //   ssl: {
      //     rejectUnauthorized: false,
      //   },
      // },
      synchronize: true,
      entities: [UserEntity],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
