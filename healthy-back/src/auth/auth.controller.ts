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
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
    const result = await this.authService.login(userInput); // User는 여기서 필요없음

    if (result.result) {
      res.cookie('healthy_token', result.token, {
        httpOnly: true,
        maxAge: 60 * 120 * 1000,
      });
    }
    return result; // 로그인 성공 시 result 반환 result의 값은 auth.service의 login의 return값
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
    // 프론트엔드로 리디렉트 (토큰 전달) 회원이 아니면 signup에 boolean값 전달
    if (req.user.signup) {
      const jwt = req.user.jwt;
      res.cookie('healthy_token', jwt, {
        httpOnly: true,
        maxAge: 60 * 120 * 1000,
      });
    }
    req.user.signup
      ? res.redirect(
          `http://localhost:4000/suess?signup=true&userid=${req.user.userid}&token=${req.user.jwt}`,
        )
      : res.redirect(
          `http://localhost:4000/suss?signup=false&userid=${req.user.userid}`,
        );
  }
  @ApiTags('naver')
  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverAuth() {
    return;
  }

  @Get('naver/cb')
  @UseGuards(AuthGuard('naver'))
  async naverAuthRedirect(@Req() req, @Res() res: Response) {
    if (!req.user.signup) {
      const jwt = req.user.jwtoken;
      res.cookie('healthy_token', jwt, {
        httpOnly: true,
        maxAge: 60 * 120 * 1000,
      });
    }
    req.user.signup
      ? res.redirect(
          `http://localhost:4000/suss?signup=true&userid=${req.user.userid}&token=${req.user.jwt}`,
        )
      : res.redirect(
          `http://localhost:4000/suss?signup=false&userid=${req.user.userid}`,
        );
  }

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
          `http://localhost:4000/suss?signup=true&userid=${req.user.userid}&token=${req.user.jwt}`,
        )
      : res.redirect(
          `http://localhost:4000/suss?signup=false&userid=${req.user.userid}`,
        );
  }

  @Get('cookie')
  getCookie(@Req() request: Request): string | null {
    const healthy_token = request.cookies['healthy_token'];

    return healthy_token ? healthy_token : null;
  }
}
