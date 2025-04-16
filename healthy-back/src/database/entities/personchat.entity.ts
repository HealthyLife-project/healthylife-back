import { uptime } from 'process';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { PersonChatRoom } from './personchatRoom.entitiy';
@Entity()
export class PersonChat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({ unique: true })
  userid: number;

  @ManyToOne(() => PersonChatRoom, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomid' })
  room: PersonChatRoom;
  @Column({})
  roomid: number;

  @CreateDateColumn()
  createdAt: Date;
}
