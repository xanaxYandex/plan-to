import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import {UsersService} from '../users/users.service';
import {CreateUserDto, LoginCredentialsDto} from '@plan-to-lib';
import {TokenService} from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
              private readonly tokenService: TokenService
              ) { }

  async register(payload: CreateUserDto) {
    const userExist = await this.usersService.getByEmail(payload.email);
    if (userExist) throw new BadRequestException('User already exist');
    return this.usersService.create(payload);
  }

  async login(payload: LoginCredentialsDto) {
    const user = await this.usersService.getByEmail(payload.email);
    if (!user) throw new NotFoundException('Incorrect credentials');

    const passwordValid = await bcrypt.compare(payload.password, user.password)
    if (!passwordValid) throw new NotFoundException('Incorrect credentials');

    const token = await this.tokenService.generateJwtToken(user);
    delete user.password;
    return {...user, token};
  }

}
