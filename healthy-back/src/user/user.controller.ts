import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Swagger 데코레이터

@ApiTags('users') // 'users' 태그 추가
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' }) // API 설명 추가
  @ApiResponse({ status: 200, description: 'The found user', type: String }) // 응답 상태와 설명 추가
  @ApiResponse({ status: 404, description: 'User not found' }) // 에러 상태와 설명 추가
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' }) // 모든 사용자 조회
  findAll() {
    return this.userService.findAll();
  }

  @Get('create/:username/:email')
  @ApiOperation({ summary: 'Create a user with username and email' }) // 사용자 생성
  create(@Param('username') username: string, @Param('email') email: string) {
    return this.userService.create(username, email);
  }

  @Get('update/:id/:username/:email')
  @ApiOperation({ summary: 'Update user with id, username, and email' }) // 사용자 업데이트
  update(
    @Param('id') id: number,
    @Param('username') username: string,
    @Param('email') email: string,
  ) {
    return this.userService.update(id, username, email);
  }
}
