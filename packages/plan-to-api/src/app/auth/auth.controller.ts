import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {CreateUserDto, LoginCredentialsDto} from '@plan-to-lib';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {
  }

  @Post('signup')
  signup(@Body() payload: CreateUserDto) {
    return this.auth.register(payload);
  }

  @Post('signin')
  signin(@Body() payload: LoginCredentialsDto) {
    return this.auth.login(payload);
  }

}
