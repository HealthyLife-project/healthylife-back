import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PayService {
  private readonly TOSS_SECRET_KEY: string;
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRefo: Repository<User>,
  ) {
    this.TOSS_SECRET_KEY = this.configService.get<string>(
      'TOSS_SECRET_KEY',
      '',
    );
    if (!this.TOSS_SECRET_KEY) {
      throw new Error('TOSS_SECRET_KEY is not defined');
    }
  }

  async verifyPay(paymentKey: string, orderId: string, amount: string) {
    const secretKey = Buffer.from(
      'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6:',
    ).toString('base64');
    console.log(secretKey, 'secret');
    try {
      // 결제 검증하는 곳
      const res = await axios.post(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          paymentKey,
          orderId,
          amount: parseInt(amount, 10),
        },
        {
          headers: {
            Authorization: `Basic ${secretKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(res.data, '결제정보');

      return {
        success: res.data.status === 'DONE',
        data: res.data, // Toss 결제 응답 전체 반환
      };
    } catch (error) {
      console.error('error', {
        status: error.response?.status, // HTTP 상태 코드
        data: error.response?.data, // Toss 응답 데이터 (여기에 오류 이유가 나올 가능성이 큼)
        message: error.message, // 기본 에러 메시지
      });
      throw new HttpException('failed', HttpStatus.BAD_REQUEST);
    }
  }
}
