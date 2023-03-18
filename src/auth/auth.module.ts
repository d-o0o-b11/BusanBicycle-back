import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwtToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}

/**
 * @Module({
  imports: [
    PassportModule,

    JwtModule.registerAsync({
      imports: [ServerConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwtSecret,
      }),
      inject: [AppConfigService],
    }),

    HttpModule,
    UserModule,
    ServerConfigModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    JwtStrategy,
    NoneJwtStrategy,
    {
      provide: AUTHENTICATION_SERVICE_TOKEN,
      useClass: AuthenticationService,
    },
    {
      provide: KAKAO_AUTHENTICATION_SERVICE_TOKEN,
      useClass: KakaoAuthenticationService,
    },
  ],
  exports: [
    PassportModule,
    JwtStrategy,
    NoneJwtStrategy,
    JwtModule,
  ],
})
 */
