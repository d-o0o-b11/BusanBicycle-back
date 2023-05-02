import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BicycleCourseModule } from './bicycle-course/bicycle-course.module';
import { BicycleAirModule } from './bicycle-air/bicycle-air.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CryptoModule } from './crypto/crypto.module';
import databaseConfig from './configs/database.config';
import mailConfig from './configs/mail.config';

@Module({
  imports: [
    // TypeOrmModule.forRoot(typeORMConfig),
    ConfigModule.forRoot({
      // envFilePath: ['src/envs/development.env, src/envs/production.env'],
      envFilePath: [`src/envs/${process.env.NODE_ENV}.env`],
      load: [databaseConfig, mailConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath:
            process.env.NODE_ENV == 'dev'
              ? 'src/envs/development.env'
              : 'src/envs/production.env',
          load: [databaseConfig],
          isGlobal: true,
        }),
      ],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('postgres'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    BicycleCourseModule,
    BicycleAirModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    EmailModule,
    CryptoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
