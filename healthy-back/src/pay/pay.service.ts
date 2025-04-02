import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PayService {
  private readonly TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY;

  async verifyPay(paymentKey: string, orderId: string, amount: string) {
    try {
      // 결제 검증하는 곳
      const res = await axios.post(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          paymentKey,
          orderId,
          amount,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.TOSS_SECRET_KEY}:`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return res.data; // 결제정보
    } catch (error) {
      console.error('failed', error.res?.data || error.message);
      throw new HttpException('failed', HttpStatus.BAD_REQUEST);
    }
  }
}
