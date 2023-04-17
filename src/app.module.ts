import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BicycleCourseModule } from './bicycle-course/bicycle-course.module';
import { BicycleCourseEntity } from './bicycle-course/entities/bicycle-course.entity';
import { CourseLikeEntity } from './bicycle-course/entities/course-like.entity';
import { CourseFinishEntity } from './bicycle-course/entities/course-finish.entity';
import { JwtStrategy } from './auth/strategies/jwtToken.strategy';
import { typeORMConfig } from './configs/typeorm.config';
import { BicycleAirModule } from './bicycle-air/bicycle-air.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'DataBase',
    //   port: 5432,
    //   username: 'test',
    //   password: '1234',
    //   database: 'postgres',
    //   // extra: {
    //   //   ssl: {
    //   //     rejectUnauthorized: false,
    //   //   },
    //   // },
    //   synchronize: true,
    //   entities: [
    //     // UserEntity,
    //     // BicycleCourseEntity,
    //     // CourseLikeEntity,
    //     // CourseFinishEntity,
    //     __dirname + './**/**/*.entity{.ts}',
    //   ],
    // }),
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
    AuthModule,
    BicycleCourseModule,
    BicycleAirModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
