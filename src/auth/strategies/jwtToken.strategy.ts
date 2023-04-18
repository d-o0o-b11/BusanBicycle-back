// import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from '../jwt-token.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

// }
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
    if (!payload) {
      const unAuthorizedException = new UnauthorizedException(
        'Jwt TOken이 없어 인증이 실패하였습니다.',
      );
      throw unAuthorizedException;
    }
    return { id: payload.id, user_id: payload.user_id };
  }
}

/**
 *  const token = String(req.headers['authorization']).split('Bearer ')[1];

    const payload: GroomerJwtToken = this.jwtService.decode(
      token,
    ) as GroomerJwtToken;

    if (!payload || !payload.groomer || !payload.id) {
      const unAuthorizedException = new UnauthorizedException(
        'Groomer Jwt Token 이 없어 인증이 실패하였습니다.',
        req.url,
      );

      throw unAuthorizedException;
    }

    return payload;
 */
