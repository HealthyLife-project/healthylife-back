import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PersonChatRoom } from './personchatRoom.entitiy';
@Entity()
export class PersonChatIndex {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({})
  userid: number;

  @ManyToOne(() => PersonChatRoom, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomid' })
  room: PersonChatRoom;
  @Column({})
  roomid: number;

  @Column({ nullable: true })
  text: string;

  @Column({})
  userNickname: string;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  aopen: string;
}
