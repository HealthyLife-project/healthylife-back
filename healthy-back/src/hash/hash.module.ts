import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from './hash.service';
import { HashController } from './hash.controller';
import { Hashtag } from '../database/entities/hash.entity';
import { Category } from '../database/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag, Category])],
  providers: [HashService],
  controllers: [HashController],
})
export class HashModule {}
