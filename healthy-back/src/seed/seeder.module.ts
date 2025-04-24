import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder';
import { User } from '../database/entities/user.entity';
import { Category } from '../database/entities/category.entity';
import { Hashtag } from '../database/entities/hash.entity';
import { Adb } from '../database/entities/ad.entity';
import { UserHashtag } from '../database/entities/hashtag.entity';

import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Category, Hashtag, Adb, UserHashtag]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
