import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { PersonChatRoom } from './personchatRoom.entitiy';
import { PersonChatIndex } from './personchatindex.entity';

@Entity()
export class PersonChatWrite {
  @PrimaryGeneratedColumn()
  id: number;

  // userid는 User 테이블의 id를 참조
  @Column({})
  userid: number;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({})
  roomid: number;
  // roomid는 PersonChatRoom 테이블의 id를 참조
  @ManyToOne(() => PersonChatRoom, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomid' })
  room: PersonChatRoom;

  @Column({})
  chatid: number;
  // chatid는 PersonChatIndex 테이블의 id를 참조
  @ManyToOne(() => PersonChatIndex, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatid' })
  chat: PersonChatIndex;
}
