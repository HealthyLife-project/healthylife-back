import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UnauthorizedException,
  Res,
  Req,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
  }
}

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signupAdmin(@Body() obj: any) {
    return await this.adminService.adminSignUp(obj);
  }

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const result = await this.adminService.adminLogin(body);

    if (!result.result) {
      throw new UnauthorizedException('아이디 또는 비밀번호가 틀렸습니다.');
    }

    res.cookie('admin_token', result.jwt, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      sameSite: 'lax', // 또는 'strict' / 'none'
      secure: false,
    });

    return result.result ? result : result.result;
  }

  @Get('check')
  checkLogin(@Req() req: Request) {
    const token = req.cookies['admin_token'];
    if (!token) return { login: false };

    try {
      const user = this.jwtService.verify(token);
      return { login: true, user };
    } catch {
      return { login: false };
    }
  }
}
