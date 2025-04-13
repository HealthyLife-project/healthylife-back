import { Injectable } from '@nestjs/common';

import { InBody } from 'src/database/entities/inbody.entity';
import { InBodyData } from 'src/database/entities/inbodyData.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, DeepPartial } from 'typeorm';
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
    console.log('obj', obj);

    const inbody = this.inbodyrep.create({
      weight: obj.weight,
      muscleMass: obj.musclemass,
      bodyFat: obj.fatmass,
      bodyFatPer: obj.fatper,
      bmi: obj.bmi,
      height: obj.height,
      userId: id,
    });

    console.log('inbody', inbody);

    await this.inbodyrep.save(inbody);

    return inbody;
  }

  async inbodyInfoGet(id: number): Promise<InBody[] | null> {
    const data = await this.inbodyrep.find({ where: { userId: id } });
    return data ? data : null;
  }
}
