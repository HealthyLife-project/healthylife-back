import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { HashController } from './hash.controller';

@Module({
  providers: [HashService],
  controllers: [HashController]
})
export class HashModule {}
