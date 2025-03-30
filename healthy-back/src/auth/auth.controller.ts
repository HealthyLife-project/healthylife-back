import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; // AuthService import
import { User } from 'src/database/entities/user.entity'; // User Entity import
import { LoginDto } from 'src/database/entities/dto/userdto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth') // '/auth' 경로로 요청을 처리
export class AuthController {
  constructor(private readonly authService: AuthService) {} // AuthService 의존성 주입

  @Post('login') // 로그인 API
  @ApiOperation({
    summary: '로그인',
  })
  @ApiBody({
    description: 'type',
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    description: 'success',
    schema: {
      example: {
        result: true,
        token: 'JWTtoken',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'fail',
    schema: {
      example: {
        result: false,
        message:
          '비밀번호가 올바르지 않습니다. 또는 존재하지 않는 사용자입니다.',
      },
    },
  })
  async login(
    @Body() userInput: { userid: string; password: string }, // 요청 본문에서 userid, password 받기
  ) {
    // AuthService의 login 메서드를 호출하여 결과 처리
    const result = await this.authService.login(userInput); // User는 여기서 필요없음
    return result; // 로그인 성공 시 result 반환
  }
}
