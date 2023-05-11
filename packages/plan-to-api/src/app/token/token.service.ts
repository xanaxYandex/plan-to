import { Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {IUser} from '@plan-to-lib';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {
  }

  async generateJwtToken(user: IUser) {
    return this.jwt.sign({ email: user.email, sub: user._id}, {
      secret: process.env.JWT_SECRET
    })
  }

  async decodeJwtToken(token: string) {
    return this.jwt.decode(token, {

    });
  }
}
