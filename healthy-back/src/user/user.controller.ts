import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../database/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() userData: Partial<User>) {
    return this.userService.create(userData);
  }

  @Get('findall')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get('finduser/:userid')
  async findUser(
    @Param('userid') userid: string,
  ): Promise<{ result: boolean; message: string }> {
    const userVeli = await this.userService.findUser(userid); // userVeli는 { result, message } 형태입니다.
    return userVeli; // { result, message } 형태를 그대로 반환
  }

  @Get('findnickname/:nickname')
  async findNickname(
    @Param('userid') nickname: string,
  ): Promise<{ result: boolean; message: string }> {
    const userVeli = await this.userService.findNickname(nickname); // userVeli는 { result, message } 형태입니다.
    return userVeli; // { result, message } 형태를 그대로 반환
  }
}
