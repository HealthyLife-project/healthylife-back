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
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
      sameSite: 'lax', // 또는 'strict' / 'none'
    });

    return result;
  }
}
