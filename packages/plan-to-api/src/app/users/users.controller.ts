import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto, LoginCredentialsDto, UpdateUserDto} from '@plan-to-lib';
import {JwtAuthGuard} from '../guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }


  // @Get()
  // getAllUsers() {
  //   return this.usersService.getAll();
  // }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getById(id);
  }


  // @Post()
  // createUser(@Body() user: any) {
  //   return this.usersService.create(user);
  // }

  @Patch(':id')
  updateUser(@Param('id') id: string,
               @Body() users: UpdateUserDto) {
    return this.usersService.updateById(id, users);
  }

  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   return this.usersService.deleteById(id);
  // }
}
