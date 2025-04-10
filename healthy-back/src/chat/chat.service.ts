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
      const room = this.PetChatRoomRepo.create({
        title: obj.title,
        userid: obj.id,
      });

      await this.PetChatRoomRepo.save(room);

      const userRoom = await this.PetChatRoomRepo.findOne({
        where: { userid: obj.id },
      });
      if (!userRoom) {
        return { result: false };
      }
      const insertRoom = this.PetChatRepo.create({
        roomid: userRoom.id,
        userid: Number(obj.id),
      });
      await this.PetChatRepo.save(insertRoom);

      return { result: true };
    } catch (e) {
      console.error(e);
      return { result: false };
    }
  }

  async createPersonRoom(obj: any): Promise<{ result: boolean }> {
    try {
      const room = this.PersonChatRoomRepo.create({
        title: obj.title,
        userid: obj.id,
      });
      await this.PersonChatRoomRepo.save(room);

      const userRoom = await this.PersonChatRoomRepo.findOne({
        where: { userid: obj.id },
      });
      if (!userRoom) {
        return { result: false };
      }
      const insertRoom = this.PersonChatRepo.create({
        roomid: userRoom.id,
        userid: Number(obj.id),
      });
      await this.PetChatRepo.save(insertRoom);
      return { result: true };
    } catch (e) {
      return { result: false };
    }
  }

  async createPetMessage(
    arr: any,
  ): Promise<{ result: boolean; message: string }> {
    try {
      for (const item of arr) {
        const message = this.PersonChatIndexRepo.create(item);
        await this.PersonChatIndexRepo.save(message);
      }
      return { result: true, message: '메세지 저장 성공' };
    } catch (e) {
      return { result: false, message: `${e}` };
    }
  }

  async createPersonMessage(
    arr: any,
  ): Promise<{ result: boolean; message: string }> {
    try {
      const message = this.PersonChatIndexRepo.create(arr);
      await this.PersonChatIndexRepo.save(message);

      return { result: true, message: '메세지 저장 성공' };
    } catch (e) {
      return { result: false, message: `${e}` };
    }
  }

  async deletePetRoom(
    id: number,
  ): Promise<{ result: boolean; message: string }> {
    try {
      await this.PetChatRepo.delete({ roomid: id });
      const room = await this.PetChatRoomRepo.findOne({ where: { id } });

      if (!room) {
        return { result: false, message: `채팅방을 찾을 수 없습니다` };
      }

      // 인원 수 감소
      room.cnt -= 1;

      // 인원 수가 0이면 방도 삭제
      if (room.cnt <= 0) {
        await this.PetChatRoomRepo.delete({ id: id });
      } else {
        await this.PetChatRoomRepo.save(room);
      }

      return { result: true, message: '채팅방을 나갔습니다' };
    } catch (e) {
      return { result: false, message: `${e}` };
    }
  }

  async deletePersonRoom(
    id: number,
  ): Promise<{ result: boolean; message: string }> {
    try {
      await this.PersonChatRepo.delete({ roomid: id });
      const room = await this.PetChatRoomRepo.findOne({ where: { id } });

      if (!room) {
        return { result: false, message: `채팅방을 찾을 수 없습니다` };
      }

      // 인원 수 감소
      room.cnt -= 1;

      // 인원 수가 0이면 방도 삭제
      if (room.cnt <= 0) {
        await this.PersonChatRoomRepo.delete({ id: id });
      } else {
        await this.PersonChatRoomRepo.save(room);
      }

      return { result: true, message: '채팅방을 나갔습니다' };
    } catch (e) {
      return { result: false, message: `${e}` };
    }
  }

  async insertPetRoom(
    obj: any,
  ): Promise<{ result: boolean; message: string; data?: any }> {
    try {
      const data = await this.PetChatRepo.findOne({
        where: { userid: obj.userid, roomid: obj.roomid },
      });
      if (!data) {
        const join = this.PetChatRepo.create({
          userid: obj.userid,
          roomid: obj.roomid,
        });
        await this.PetChatRepo.save(join);

        const room = await this.PetChatRoomRepo.findOne({
          where: { id: obj.roomid },
        });

        if (!room) {
          return { result: false, message: '채팅방을 찾을 수 없습니다' };
        }

        room.cnt += 1;

        await this.PetChatRoomRepo.save(room);

        return { result: true, message: '채팅방에 입장했습니다' };
      } else {
        const message = await this.PetChatIndexRepo.find({
          where: { roomid: obj.roomid },
        });

        return {
          result: true,
          message: '채팅방에 입장했습니다',
          data: message,
        };
      }
    } catch (e) {
      return { result: false, message: `${e}` };
    }
  }

  async insertPersonRoom(
    obj: any,
  ): Promise<{ result: boolean; message: string; data?: any }> {
    try {
      const data = await this.PersonChatRepo.findOne({
        where: { userid: obj.userid, roomid: obj.roomid },
      });
      if (!data) {
        const join = this.PersonChatRepo.create({
          userid: obj.userid,
          roomid: obj.roomid,
        });
        await this.PersonChatRepo.save(join);

        const room = await this.PersonChatRoomRepo.findOne({
          where: { id: obj.roomid },
        });

        if (!room) {
          return { result: false, message: '채팅방을 찾을 수 없습니다' };
        }

        room.cnt += 1;

        await this.PersonChatRoomRepo.save(room);

        return { result: true, message: '채팅방에 입장했습니다' };
      } else {
        const message = await this.PersonChatIndexRepo.find({
          where: { roomid: obj.roomid },
        });

        return {
          result: true,
          message: '채팅방에 입장했습니다',
          data: message,
        };
      }
    } catch (e) {
      return { result: false, message: `${e}` };
    }
  }
}
