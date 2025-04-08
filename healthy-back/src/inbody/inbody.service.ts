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

  async inbodyUpdate(id: number, obj: CreateInbodyDto): Promise<InBody> {
    console.log(obj);
    const inbody = this.inbodyrep.create({
      ...obj,
      userId: id,
    });

    console.log(inbody);

    await this.inbodyrep.save(inbody);

    return inbody;
  }
}
