import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MyPageEntity } from './users/entities/mypage.entity';
import { BicycleCorseModule } from './bicycle-corse/bicycle-corse.module';

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
      entities: [UserEntity, MyPageEntity],
    }),
    UsersModule,
    AuthModule,
    BicycleCorseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
