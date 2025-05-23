import { Injectable } from '@nestjs/common';

import { InBody } from 'src/database/entities/inbody.entity';
import { InBodyData } from 'src/database/entities/inbodyData.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  DeleteResult,
  DeepPartial,
  MoreThanOrEqual,
} from 'typeorm';
import { CreateInbodyDto } from 'src/database/entities/dto/inbodydtop';
import { User } from 'src/database/entities/user.entity';
@Injectable()
export class InbodyService {
  constructor(
    @InjectRepository(InBody) private readonly inbodyrep: Repository<InBody>,
    @InjectRepository(InBodyData)
    private readonly inbodydatarep: Repository<InBodyData>,
  ) {}

  async inbodyUpdate(id: number, obj: any): Promise<InBody> {
    const inbody = this.inbodyrep.create({
      weight: obj.weight,
      muscleMass: obj.musclemass,
      bodyFat: obj.fatmass,
      bodyFatPer: obj.fatper,
      bmi: obj.bmi,
      height: obj.height,
      userId: id,
    });

    await this.inbodyrep.save(inbody);

    return inbody;
  }

  async inbodyInfoGet(id: number): Promise<InBody | null> {
    const data = await this.inbodyrep.findOne({ where: { userId: id } });
    return data ? data : null;
  }

  async inbodyInfoGetAll(id: number): Promise<InBody[] | null> {
    const nowYear = new Date();
    nowYear.setFullYear(nowYear.getFullYear() - 1);

    const data = await this.inbodyrep.find({
      where: { userId: id, createdAt: MoreThanOrEqual(nowYear) },
    });
    return data ? data : null;
  }
}
