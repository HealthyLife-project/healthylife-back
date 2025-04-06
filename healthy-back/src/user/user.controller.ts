import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../database/entities/user.entity';
import { UpdatePasswordDto } from 'src/database/entities/dto/userdto';
import { UserDto } from 'src/database/entities/dto/userdto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('User') // User 관련 API
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 사용자 계정을 생성',
  })
  @ApiBody({ type: User })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    schema: {
      example: { result: true, message: '회원가입이 완료되었습니다.' },
    },
  })
  @ApiResponse({
    status: 400,
    description: '회원가입 실패',
    schema: {
      example: { result: false, message: '이미 존재하는 사용자입니다.' },
    },
  })
  create(@Body() userData: Partial<User>) {
    return this.userService.create(userData);
  }

  @Get('findall')
  @ApiOperation({
    summary: '모든 사용자 조회',
    description: 'DB에 저장된 모든 사용자 정보를 가져옴',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    schema: {
      example: [
        {
          id: 1,
          userid: 'user1',
          nickname: '닉네임1',
          email: 'user1@example.com',
        },
        {
          id: 2,
          userid: 'user2',
          nickname: '닉네임2',
          email: 'user2@example.com',
        },
      ],
    },
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 사용자 조회',
    description: '사용자 ID를 기반으로 정보를 가져옴',
  })
  @ApiParam({ name: 'id', type: 'number', description: '사용자 ID' })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    schema: {
      example: {
        id: 1,
        userid: 'user1',
        nickname: '닉네임1',
        email: 'user1@example.com',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '사용자 없음',
    schema: {
      example: { result: false, message: '해당 사용자를 찾을 수 없습니다.' },
    },
  })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get('finduser/:userid')
  @ApiOperation({
    summary: '아이디 중복 확인',
    description: '아이디가 이미 존재하는지 확인',
  })
  @ApiParam({
    name: 'userid',
    type: 'string',
    description: '확인할 사용자 아이디',
  })
  @ApiResponse({
    status: 200,
    description: '중복 여부 확인',
    schema: { example: { result: true, message: '사용 가능한 아이디입니다.' } },
  })
  async findUser(
    @Param('userid') userid: string,
  ): Promise<{ result: boolean; message: string }> {
    return this.userService.findUser(userid);
  }

  @Get('findnickname/:nickname')
  @ApiOperation({
    summary: '닉네임 중복 확인',
    description: '닉네임이 이미 존재하는지 확인',
  })
  @ApiParam({ name: 'nickname', type: 'string', description: '확인할 닉네임' })
  @ApiResponse({
    status: 200,
    description: '중복 여부 확인',
    schema: { example: { result: true, message: '사용 가능한 닉네임입니다.' } },
  })
  async findNickname(
    @Param('nickname') nickname: string,
  ): Promise<{ result: boolean; message: string }> {
    return this.userService.findNickname(nickname);
  }

  @Post('update/password')
  @ApiOperation({
    summary: '비밀번호 업데이트',
  })
  @ApiResponse({
    status: 200,
    description: '비밀번호 업데이트 성공',
    schema: { example: { result: true, message: '비밀번호 변경 성공' } },
  })
  @ApiResponse({
    status: 204,
    description: '비밀번호 업데이트 실패',
    schema: { example: { result: false, message: '비밀번호 변경 실패' } },
  })
  async updatePass(@Body() PasswordInput: UpdatePasswordDto) {
    return this.userService.updatePassword(PasswordInput);
  }

  @Post('findUserEmail')
  @ApiOperation({
    summary: ' 이메일로 유저 찾기 ',
  })
  @ApiResponse({
    status: 200,
    description: '이메일로 유저 찾기',
    type: UserDto,
  })
  async findEmailUser(@Body() email: string): Promise<UserDto | null> {
    return this.userService.findEmailUser(email);
  }
}
