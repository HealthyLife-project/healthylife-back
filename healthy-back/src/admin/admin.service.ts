import { UserAdmin } from 'src/database/entities/useradmin.entity';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(UserAdmin)
    private readonly AdminRepo: Repository<UserAdmin>,
    private readonly jwtService: JwtService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // 비밀번호 검증 함수
  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async createJWTPASS(user: UserAdmin): Promise<string> {
    const payload = { id: user.id, userid: user.userid };
    return this.jwtService.sign(payload);
  }

  async adminSignUp(obj: any): Promise<any> {
    const data = this.AdminRepo.create(obj);
    const saveUser = await this.AdminRepo.save(data);
    return { saveUser, result: true };
  }

  async adminLogin(obj: any): Promise<any> {
    const user = await this.AdminRepo.findOne({
      where: { userid: obj.userid, password: obj.password },
    });

    return user
      ? { result: true, message: '로그인 성공', jwt: this.createJWTPASS(user) }
      : { result: false };
  }
}
