import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // public test() {
  //     const user = {
  //         id: 30
  //     }

  //     this.jwtService.sign() -> 인크립트
  // }
}
