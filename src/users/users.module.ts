import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BicycleCourseModule } from 'src/bicycle-course/bicycle-course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
    AuthModule,
    BicycleCourseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
