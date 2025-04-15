import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { PersonChatRoom } from './personchatRoom.entitiy';
import { PersonChatIndex } from './personchatindex.entity';

@Entity()
export class PersonChatWrite {
  @PrimaryGeneratedColumn()
  id: number;

  // userid는 User 테이블의 id를 참조
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  userid: User;

  // roomid는 PersonChatRoom 테이블의 id를 참조
  @ManyToOne(() => PersonChatRoom, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomid', referencedColumnName: 'id' })
  roomid: PersonChatRoom;

  // chatid는 PersonChatIndex 테이블의 id를 참조
  @ManyToOne(() => PersonChatIndex, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatid', referencedColumnName: 'id' })
  chatid: PersonChatIndex;
}
