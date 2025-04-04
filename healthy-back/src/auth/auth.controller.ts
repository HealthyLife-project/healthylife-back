import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service'; // AuthService import
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/database/entities/user.entity'; // User Entity import
import { Response, Request } from 'express';
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

  @Post('login')
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
    @Body() userInput: { userid: string; password: string },
    @Res() res: Response,
  ) {
    const result = await this.authService.login(userInput);
    console.log(result);
    if (result.result) {
      console.log(result.token, 'adfsfsd');
      res.cookie('healthy_token', result.token, {
        httpOnly: true,
        maxAge: 60 * 120 * 1000,
      });
    }
    return res.json(result); // 로그인 성공 시 result 반환 result의 값은 auth.service의 login의 return값
  }
  @ApiTags('google')
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('google/cb')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    if (req.user.signup) {
      const jwt = req.user.jwt;
      res.cookie('healthy_token', jwt, {
        httpOnly: true,
        maxAge: 60 * 120 * 1000,
      });
    }
    // 프론트엔드로 리디렉트 (토큰 전달) 회원이 아니면 signup에 boolean값 전달

    req.user.signup
      ? res.redirect(
          `http://localhost:3000/login/social-login?signup=true&token=${req.user.jwt}`,
        )
      : res.redirect(
          `http://localhost:3000/login/social-login?signup=false&provider=google`,
        );
  }
  //google endpoint

  @ApiTags('naver')
  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverAuth() {
    return;
  }

  @Get('naver/cb')
  @UseGuards(AuthGuard('naver'))
  async naverAuthRedirect(@Req() req, @Res() res: Response) {
    if (req.user.signup) {
      const jwt = req.user.jwt;
      res.cookie('healthy_token', jwt, {
        httpOnly: true,
        maxAge: 60 * 120 * 1000,
      });
    }
    req.user.signup
      ? res.redirect(
          `http://localhost:3000/login/social-loginsuccess?signup=true&token=${req.user.jwt}`,
        )
      : res.redirect(
          `http://localhost:3000/login/social-loginsuccess?signup=false&provider=naver`,
        );
  }
  // naver endpoint

  @ApiTags('kakao')
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth() {
    return;
  }

  @Get('kakao/cb')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req, @Res() res: Response) {
    if (req.user.signup) {
      const jwt = req.user.jwt;
      res.cookie('healthy_token', jwt, {
        httpOnly: true,
        maxAge: 60 * 120 * 1000,
      });
    }

    req.user.signup
      ? res.redirect(
          `http://localhost:3000/login/social-login?signup=true&token=${req.user.jwt}`,
        )
      : res.redirect(
          `http://localhost:3000/login/social-login?signup=false&provider=kakao`,
        );
  }
  //kakao endpoint

  @Get('cookie')
  @ApiOperation({
    summary: '쿠키 조회',
    description: 'healthy_token 쿠키 값',
  })
  @ApiResponse({
    status: 200,
    description: '쿠키 값과 유저 데이터를 반환',
    schema: {
      example: {
        result: true,
        healthy_token: 'token',
        user: {
          id: 1,
          userid: 'testuser',
          nickname: '닉네임',
          name: '홍길동',
          age: 25,
          gender: '남자',
          email: 'test@example.com',
          phone: '010-1234-5678',
          address: '서울시 강남구',
          provider: 'google',
          reportCnt: 0,
          inbodys: [],
          hashtags: [],
          reports: [],
        },
      },
    },
  })
  @ApiResponse({
    status: 204,
    description: 'null',
  })
  getCookie(@Req() req: Request): {} | null {
    const healthy_token = req.cookies['healthy_token'];
    const user = this.authService.validateToken(healthy_token);
    console.log(healthy_token, user);
    return healthy_token ? { result: true, healthy_token, user: user } : null;
  }

  @Get('logout')
  @ApiOperation({
    summary: '쿠키 제거',
  })
  @ApiResponse({
    status: 200,
    description: '{}',
    schema: {
      type: 'object',
      properties: {
        return: { type: 'boolean', example: true },
        message: { type: 'string', example: '로그아웃' },
      },
    },
  })
  clearCookie(@Res() res: Response) {
    res.clearCookie('healthy_token', {
      httpOnly: true,
      sameSite: 'strict',
    });
    return res.json({ result: true, message: '로그아웃' });
  }
}
