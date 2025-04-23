import { Injectable } from '@nestjs/common'; // Injectable 데코레이터를 사용하여 이 클래스가 서비스로 사용될 수 있도록 정의
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';

import { PersonChat } from 'src/database/entities/personchat.entity';
import { PersonChatIndex } from 'src/database/entities/personchatindex.entity';
import { PersonChatRoom } from 'src/database/entities/personchatRoom.entitiy';
import { PersonChatWrite } from 'src/database/entities/personchatwrite.entity';

import { PetChat } from 'src/database/entities/petchat.entity';
import { PetChatIndex } from 'src/database/entities/petchatindex.entity';
import { PetChatRoom } from 'src/database/entities/petchatRoom.entity';
import { PetChatWrite } from 'src/database/entities/petchatwrite.entity';

import { User } from 'src/database/entities/user.entity';
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
    @InjectRepository(PersonChat)
    private readonly PersonChatRepo: Repository<PersonChat>,

    @InjectRepository(PersonChatIndex)
    private readonly PersonChatIndexRepo: Repository<PersonChatIndex>,

    @InjectRepository(PersonChatRoom)
    private readonly PersonChatRoomRepo: Repository<PersonChatRoom>,

    @InjectRepository(PersonChatWrite)
    private readonly PersonChatWriteRepo: Repository<PersonChatWrite>,

    @InjectRepository(PetChat)
    private readonly PetChatRepo: Repository<PetChat>,

    @InjectRepository(PetChatIndex)
    private readonly PetChatIndexRepo: Repository<PetChatIndex>,

    @InjectRepository(PetChatRoom)
    private readonly PetChatRoomRepo: Repository<PetChatRoom>,

    @InjectRepository(PetChatWrite)
    private readonly PetChatWriteRepo: Repository<PetChatWrite>,
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

  async findPersonRoom(num: number): Promise<any[] | null> {
    const room = await this.PersonChatRepo.find({ where: { userid: num } });
    const data = await Promise.all(
      room.map(async (item) => {
        const res = await this.PersonChatRoomRepo.findOne({
          where: { id: item.roomid },
        });
        return {
          id: item.id,
          userid: item.userid,
          roomid: item.roomid,
          title: res?.title || null,
        };
      }),
    );
    return room ? data : null;
  }

  async findPetRoom(num: number): Promise<any[] | null> {
    const room = await this.PetChatRepo.find({ where: { userid: num } });
    const data = await Promise.all(
      room.map(async (item) => {
        const res = await this.PetChatRoomRepo.findOne({
          where: { id: item.roomid },
        });
        return {
          id: item.id,
          userid: item.userid,
          roomid: item.roomid,
          title: res?.title || null,
        };
      }),
    );
    return room ? data : null;
  }

  async createPetRoom(obj: any): Promise<any> {
    try {
      const room = this.PetChatRoomRepo.create({
        title: obj.title,
        userid: obj.id,
      });

      const roomData = await this.PetChatRoomRepo.save(room);
      const data = { userid: obj.id, roomid: roomData.id };
      await this.PetChatRepo.save(data);

      const userRoom = await this.PetChatRoomRepo.findOne({
        where: { userid: obj.id },
      });
      if (!userRoom) {
        return { result: false };
      }
      // const insertRoom = this.PetChatRepo.create({
      //   roomid: userRoom.id,
      //   userid: Number(obj.id),
      // });
      // await this.PetChatRepo.save(insertRoom);

      return { result: true, roomData };
    } catch (e) {
      console.error(e);
      return { result: false };
    }
  }

  async createPersonRoom(obj: any): Promise<any> {
    try {
      const room = this.PersonChatRoomRepo.create({
        title: obj.title,
        userid: obj.id,
      });
      const roomData = await this.PersonChatRoomRepo.save(room);
      const data = { userid: obj.id, roomid: roomData.id };
      await this.PersonChatRepo.save(data);

      const userRoom = await this.PersonChatRoomRepo.findOne({
        where: { userid: obj.id },
      });
      if (!userRoom) {
        return { result: false };
      }
      // const insertRoom = this.PersonChatRepo.create({
      //   roomid: userRoom.id,
      //   userid: Number(obj.id),
      // });
      // await this.PetChatRepo.save(insertRoom);
      return { result: true, roomData };
    } catch (e) {
      return { result: false };
    }
  }

  async createPetMessage(
    arr: any,
  ): Promise<{ result: boolean; message: string }> {
    try {
      const message = this.PetChatIndexRepo.create(arr);
      await this.PetChatIndexRepo.save(message);

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
    userid: number,
    roomid: number,
  ): Promise<{ result: boolean; message: string; chat: any[] | null }> {
    try {
      await this.PetChatRepo.delete({ userid: userid, roomid: roomid });
      const room = await this.PetChatRoomRepo.findOne({
        where: { id: roomid },
      });
      console.log(room, '방 있어');
      if (!room) {
        return {
          result: false,
          message: `채팅방을 찾을 수 없습니다`,
          chat: null,
        };
      }

      // 인원 수 감소
      room.cnt -= 1;
      console.log('roomcnt', room.cnt);
      // 인원 수가 0이면 방도 삭제
      if (room.cnt <= 0) {
        console.log('roomcnt2', room.cnt, roomid);
        const result = await this.PetChatRoomRepo.delete({ id: roomid });
        console.log('삭제 결과:', result);
      } else {
        await this.PetChatRoomRepo.update(room.id, {
          cnt: room.cnt,
        });
      }
      const chat = (await this.PetChatRoomRepo.find()) || null;

      return { result: true, message: '채팅방을 나갔습니다', chat };
    } catch (e) {
      return { result: false, message: `${e}`, chat: null };
    }
  }

  async deletePersonRoom(
    userid: number,
    roomid: number,
  ): Promise<{ result: boolean; message: string; chat: any[] | null }> {
    try {
      await this.PersonChatRepo.delete({ userid: userid, roomid: roomid });
      const room = await this.PersonChatRoomRepo.findOne({
        where: { id: roomid },
      });
      console.log(room, '방 있어');
      if (!room) {
        return {
          result: false,
          message: `채팅방을 찾을 수 없습니다`,
          chat: null,
        };
      }

      // 인원 수 감소
      room.cnt -= 1;

      // 인원 수가 0이면 방도 삭제
      if (room.cnt <= 0) {
        await this.PersonChatRoomRepo.delete({ id: roomid });
      } else {
        await this.PersonChatRoomRepo.update(room.id, {
          cnt: room.cnt,
        });
      }
      const chat = (await this.PersonChatRoomRepo.find()) || null;
      return { result: true, message: '채팅방을 나갔습니다', chat };
    } catch (e) {
      return { result: false, message: `${e}`, chat: null };
    }
  }

  async insertPetRoom(
    obj: any,
  ): Promise<{ result: boolean; message: string; data?: any }> {
    try {
      const data = await this.PetChatRepo.findOne({
        where: { userid: obj.userid, roomid: obj.roomid },
      });
      console.log(data, 'data');
      if (data == null) {
        const join = this.PetChatRepo.create({
          userid: obj.userid,
          roomid: obj.roomid,
        });
        console.log('null 내부 들어옴, ', join);
        const data = await this.PetChatRepo.save(join);
        console.log(data, 'data저장 됨');
        const room = await this.PetChatRoomRepo.findOne({
          where: { id: obj.roomid },
        });

        if (!room) {
          return { result: false, message: '채팅방을 찾을 수 없습니다' };
        }

        room.cnt += 1;

        await this.PetChatRoomRepo.save(room);

        return { result: true, message: '채팅방에 입장했습니다', data: true };
      } else {
        return {
          result: true,
          message: '채팅방에 입장했습니다',
          data: false,
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
      console.log(data, 'data');
      if (data == null) {
        const join = this.PersonChatRepo.create({
          userid: obj.userid,
          roomid: obj.roomid,
        });
        console.log('null 내부 들어옴, ', join);
        const data = await this.PersonChatRepo.save(join);
        console.log(data, 'data저장 됨');
        const room = await this.PersonChatRoomRepo.findOne({
          where: { id: obj.roomid },
        });

        if (!room) {
          return { result: false, message: '채팅방을 찾을 수 없습니다' };
        }

        room.cnt += 1;

        await this.PersonChatRoomRepo.save(room);

        return { result: true, message: '채팅방에 입장했습니다', data: true };
      } else {
        return {
          result: true,
          message: '채팅방에 입장했습니다',
          data: false,
        };
      }
    } catch (e) {
      return { result: false, message: `${e}` };
    }
  }
  async getPetMessages(
    roomid: number,
    userid: number,
    page: number,
    limit: number,
  ) {
    // 1. 메시지를 최신순으로 가져오기 (pagination)
    const userData = await this.PetChatRepo.findOne({
      where: { userid: userid },
    });
    const messagesDate = await this.PetChatIndexRepo.find({
      where: { roomid: roomid },
    });
    if (!userData || !userData.createdAt) {
      return null;
    }
    const userCreateAt = new Date(userData?.createdAt);

    if (!userCreateAt) {
      return null;
    }

    const messages = messagesDate.filter((msg) => {
      const msgCreatedAt = new Date(msg.createdAt); // Date로 변환
      return msgCreatedAt >= userCreateAt;
    });

    // 2. 기존에 읽은 chatid 목록 가져오기
    const written = await this.PetChatWriteRepo.find({
      where: { roomid: roomid, userid: userid },
    });
    const writeChatId = written.map((w) => w.chatid);

    // 3. 안 읽은 메시지 필터링
    const unreadMessages = messages.filter(
      (msg) => !writeChatId.includes(msg.id),
    );

    // 4. 읽은 메시지로 저장
    const WritesMessage = await Promise.all(
      unreadMessages.map(async (msg) => {
        // 사용자, 채팅방, 채팅을 객체로 가져옴
        const user = await this.UserRepo.findOne({ where: { id: userid } });
        const room = await this.PetChatRoomRepo.findOne({
          where: { id: roomid },
        });
        const chat = await this.PetChatIndexRepo.findOne({
          where: { id: msg.id },
        });

        // 객체가 null이 아니어야만 create 메서드에 전달할 수 있음
        if (user && room && chat) {
          return this.PetChatWriteRepo.create({
            userid: user.id, // User  전달
            roomid: room.id, // PersonChatRoom  전달
            chatid: chat.id, // PersonChatIndex  전달
          });
        } else {
          throw new Error('error');
        }
      }),
    );
    await this.PetChatWriteRepo.save(WritesMessage);

    // 5. 오름차순 정렬해서 반환
    const messagesReverse = messages.reverse();
    const totalMessages = messagesReverse.length;
    const totalPages = Math.ceil(totalMessages / limit); // 전체 페이지 수 계산

    // 페이지 번호가 마지막 페이지를 넘지 않도록 처리
    const currentPage = Math.min(page, totalPages); // 마지막 페이지가 넘지 않도록 보장

    if (currentPage > totalPages) {
      return null;
    }

    // 메시지 잘라내기 (최신순으로 정렬된 상태에서)
    const paginated = messagesReverse.slice(
      (currentPage - 1) * limit,
      currentPage * limit,
    );
    console.log(paginated.length);
    // 마지막 페이지에 맞춰 남은 메시지가 부족한 경우도 처리 (예: 마지막 페이지의 나머지 메시지만 반환)
    return paginated.length !== 0
      ? { page: paginated.reverse(), total: totalPages }
      : null;
  }

  async getPersonMessages(
    roomid: number,
    userid: number,
    page: number,
    limit: number,
  ) {
    // 1. 메시지를 최신순으로 가져오기 (pagination)
    const userData = await this.PersonChatRepo.findOne({
      where: { userid: userid },
    });

    const messagesDate = await this.PersonChatIndexRepo.find({
      where: { roomid: roomid },
    });
    if (!userData || !userData.createdAt) {
      return null;
    }
    const userCreateAt = new Date(userData?.createdAt);

    if (!userCreateAt) {
      return null;
    }

    const messages = messagesDate.filter((msg) => {
      const msgCreatedAt = new Date(msg.createdAt); // Date로 변환
      return msgCreatedAt >= userCreateAt;
    });

    // 2. 기존에 읽은 chatid 목록 가져오기
    const written = await this.PersonChatWriteRepo.find({
      where: { roomid: roomid, userid: userid },
    });
    const writeChatId = written.map((w) => w.chatid);

    // 3. 안 읽은 메시지 필터링
    const unreadMessages = messages.filter(
      (msg) => !writeChatId.includes(msg.id),
    );

    // 4. 읽은 메시지로 저장
    const WritesMessage = await Promise.all(
      unreadMessages.map(async (msg) => {
        // 사용자, 채팅방, 채팅을 객체로 가져옴
        const user = await this.UserRepo.findOne({ where: { id: userid } });
        const room = await this.PersonChatRoomRepo.findOne({
          where: { id: roomid },
        });
        const chat = await this.PersonChatIndexRepo.findOne({
          where: { id: msg.id },
        });

        // 객체가 null이 아니어야만 create 메서드에 전달할 수 있음
        if (user && room && chat) {
          return this.PersonChatWriteRepo.create({
            userid: user.id, // User 객체 전달
            roomid: room.id, // PersonChatRoom 객체 전달
            chatid: chat.id, // PersonChatIndex 객체 전달
          });
        } else {
          throw new Error('error');
        }
      }),
    );
    await this.PersonChatWriteRepo.save(WritesMessage);

    // 5. 오름차순 정렬해서 반환
    const messagesReverse = messages.reverse();
    const totalMessages = messagesReverse.length;
    const totalPages = Math.ceil(totalMessages / limit); // 전체 페이지 수 계산

    // 페이지 번호가 마지막 페이지를 넘지 않도록 처리
    const currentPage = Math.min(page, totalPages); // 마지막 페이지가 넘지 않도록 보장
    if (currentPage >= totalPages) {
      return null;
    }
    // 메시지 잘라내기 (최신순으로 정렬된 상태에서)
    const paginated = messagesReverse.slice(
      (currentPage - 1) * limit,
      currentPage * limit,
    );
    console.log(paginated.length, page, 'length');
    // 마지막 페이지에 맞춰 남은 메시지가 부족한 경우도 처리 (예: 마지막 페이지의 나머지 메시지만 반환)
    return paginated.length !== 0
      ? { page: paginated.reverse(), total: totalPages }
      : null;
  }

  async getPersonMessageCnt(arr: any): Promise<any[]> {
    const results = await Promise.all(
      arr.map(async (item) => {
        const { userid, roomid } = item;
        // 비동기 작업 예시: 예를 들어, 메시지 개수를 조회한다고 가정
        const messageCount = await this.PersonChatIndexRepo.find({
          where: { roomid: roomid, userid: userid },
        });
        const writeCount = await this.PersonChatWriteRepo.find({
          where: { roomid: roomid, userid: userid },
        });

        return messageCount.length - writeCount.length;
      }),
    );

    return results;
  }

  async getPetMessageCnt(arr: any): Promise<any[]> {
    const results = await Promise.all(
      arr.map(async (item) => {
        const { userid, roomid } = item;
        // 비동기 작업 예시: 예를 들어, 메시지 개수를 조회한다고 가정
        const messageCount = await this.PetChatIndexRepo.find({
          where: { roomid: roomid, userid: userid },
        });
        const writeCount = await this.PetChatWriteRepo.find({
          where: { roomid: roomid, userid: userid },
        });

        return messageCount.length - writeCount.length;
      }),
    );

    return results;
  }

  async validatePetRoom(obj: any): Promise<boolean> {
    const data = await this.PetChatRepo.findOne({
      where: { userid: obj.userid, roomid: obj.roomid },
    });

    return data ? true : false;
  }

  async validatePersonRoom(obj: any): Promise<boolean> {
    const data = await this.PersonChatRepo.findOne({
      where: { userid: obj.userid, roomid: obj.roomid },
    });

    return data ? true : false;
  }

  async validatePersonRoomCreate(roomid: number): Promise<boolean> {
    const data = await this.PersonChatRoomRepo.findOne({
      where: { id: roomid },
    });

    return data ? true : false;
  }

  async validatePetRoomCreate(roomid: number): Promise<boolean> {
    const data = await this.PetChatRoomRepo.findOne({ where: { id: roomid } });

    return data ? true : false;
  }
}
