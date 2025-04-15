import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { PetChatIndex } from './petchatindex.entity';
import { PetChatRoom } from './petchatRoom.entity';
@Entity()
export class PetChatWrite {
  @PrimaryGeneratedColumn()
  id: number;

  // userid는 User 테이블의 id를 참조
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  userid: User;

  // roomid는 PersonChatRoom 테이블의 id를 참조
  @ManyToOne(() => PetChatRoom, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomid', referencedColumnName: 'id' })
  roomid: PetChatRoom;

  // chatid는 PersonChatIndex 테이블의 id를 참조
  @ManyToOne(() => PetChatIndex, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chatid', referencedColumnName: 'id' })
  chatid: PetChatIndex;
}
