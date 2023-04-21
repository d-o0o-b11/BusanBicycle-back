// import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validate } from 'class-validator';
import { JwtToken } from '../jwt-token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('dfsdf', payload);

    // const errors = await validate(object);

    const object = plainToClass(JwtToken, payload);
    const errors = await validate(object);
    console.log(errors);
    if (errors.length > 0) {
      const unAuthorizedException = new UnauthorizedException(
        'Jwt Token 인증이 실패하였습니다.',
      );
      throw unAuthorizedException;
    }
    return { id: payload.id, user_id: payload.user_id };
  }
}
