import {
  Controller,
  Get,
  Query,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PayService } from './pay.service';
import { Response } from 'express';

@Controller('pay')
export class PayController {
  constructor(private readonly paymentService: PayService) {}

  @Get('success')
  async paymentSuccess(
    @Query('paymentKey') paymentKey: string,
    @Query('orderId') orderId: string,
    @Query('amount') amount: string,
    @Res() res: Response,
  ) {
    try {
      // 결제 검증 (결제 금액과 주문 ID가 올바른지 확인)
      const payRes = await this.paymentService.verifyPay(
        paymentKey,
        orderId,
        amount,
      );

      if (payRes.success) {
        // 결제 성공 시 페이지 리다이렉트 // 주문번호
        res.redirect(
          `http://localhost:3000/payment/success?orderId=${orderId}`,
        );
      } else {
        throw new HttpException(
          'Payment verification failed',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error(error);
      res.redirect(
        //결제 실패시 페이지 리다이렉트 // 오류 메세지 (원인 포함)
        `http://localhost:3000/payment/fail?message=${error.message}`,
      );
    }
  }

  //결제 실패
  @Get('fail')
  paymentFail(@Query() query, @Res() res: Response) {
    console.error('Payment failed:', query);
    res.redirect(`http://localhost:3000/payment/fail?message=${query.message}`);
  }
}
