import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwtToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule {}

// PassportModule,
//     GroomerJwtStrategy,
//     NoneGroomerJwtStrategy,
//     JwtModule,

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
