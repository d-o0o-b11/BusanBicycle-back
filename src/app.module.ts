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
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UsersModule,
    AuthModule,
    BicycleCourseModule,
    BicycleAirModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
