import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { Report } from 'src/database/entities/report.entity';
import { User } from 'src/database/entities/user.entity';
import { ReportController } from './report.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Report, User])],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
