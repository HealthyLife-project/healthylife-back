import { Injectable } from '@nestjs/common'; // Injectable 데코레이터를 사용하여 이 클래스가 서비스로 사용될 수 있도록 정의
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PersonChat } from 'src/database/entities/personchat.entity';
import { PersonChatIndex } from 'src/database/entities/personchatindex.entity';
import { PersonChatRoom } from 'src/database/entities/personchatRoom.entitiy';
import { PetChat } from 'src/database/entities/petchat.entity';
import { PetChatIndex } from 'src/database/entities/petchatindex.entity';
import { PetChatRoom } from 'src/database/entities/petchatRoom.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(PersonChat)
    private readonly PersonChatRepo: Repository<PersonChat>,

    @InjectRepository(PersonChatIndex)
    private readonly PersonChatIndexRepo: Repository<PersonChatIndex>,

    @InjectRepository(PersonChatRoom)
    private readonly PersonChatRoomRepo: Repository<PersonChatRoom>,

    @InjectRepository(PetChat)
    private readonly PetChatRepo: Repository<PetChat>,

    @InjectRepository(PetChatIndex)
    private readonly PetChatIndexRepo: Repository<PetChatIndex>,

    @InjectRepository(PetChatRoom)
    private readonly PetChatRoomRepo: Repository<PetChatRoom>,
  ) {}

  async findallPerson(): Promise<PersonChatRoom[] | null> {
    const room = await this.PersonChatRoomRepo.find();
    return room ? room : null;
  }

  async findallPet(): Promise<PetChatRoom[] | null> {
    const room = await this.PetChatRoomRepo.find();
    return room ? room : null;
  }

  async searchPerson(str: string): Promise<any> {
    const personRoom = await this.PersonChatRoomRepo.find();
    const petRoom = await this.PetChatRoomRepo.find();

    const all = [...personRoom, ...petRoom];

    const result = all.filter((item) => item.title.includes(str));

    return result;
  }

  async findPersonRoom(num: number): Promise<PersonChatRoom | null> {
    const room = await this.PersonChatRoomRepo.findOne({ where: { id: num } });
    return room ? room : null;
  }

  async findPetRoom(num: number): Promise<PetChatRoom | null> {
    const room = await this.PetChatRoomRepo.findOne({ where: { id: num } });
    return room ? room : null;
  }

  async createPetRoom(obj: any): Promise<{ result: boolean }> {
    try {
      const room = this.PetChatRoomRepo.create(obj);
      const data = { ...room, userid: obj.id };
      await this.PetChatRoomRepo.save(data);

      return { result: true };
    } catch (e) {
      console.error(e);
      return { result: false };
    }
  }

  async createPersonRoom(obj: any): Promise<{ result: boolean }> {
    try {
      const room = this.PersonChatRoomRepo.create(obj);
      const data = { ...room, userid: obj.id };
      await this.PersonChatRoomRepo.save(data);

      return { result: true };
    } catch (e) {
      return { result: false };
    }
  }
}
