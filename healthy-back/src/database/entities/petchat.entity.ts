import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { PetChatRoom } from './petchatRoom.entity';
@Entity()
export class PetChat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({ unique: true })
  userid: number;

  @ManyToOne(() => PetChatRoom, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomid' })
  room: PetChatRoom;
  @Column({})
  roomid: number;

  @CreateDateColumn()
  createdAt: Date;
}
