import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from '../jwt-token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-token') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  static key = 'jwt-token';

  async validate(req: Request): Promise<any> {
    const token = String(req.headers['authorization']).split('Bearer ')[1];
    console.log(token);

    const payload: JwtToken = this.jwtService.decode(token) as JwtToken;
    console.log('payload', payload);

    // if (!payload || !payload.groomer || !payload.id) {
    //   const unAuthorizedException = new UnauthorizedException(
    //     'Jwt Token 이 없어 인증이 실패하였습니다.',
    //     req.url,
    //   );

    //   throw unAuthorizedException;
    // }

    return payload;
  }
}
