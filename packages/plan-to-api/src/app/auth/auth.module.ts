import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {TokenModule} from '../token/token.module';
import {JwtStrategy} from './local.auth';

@Module({
  imports: [UsersModule, TokenModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
