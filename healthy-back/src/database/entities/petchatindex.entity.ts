import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { PetChatRoom } from './petchatRoom.entity';

@Entity()
export class PetChatIndex {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({})
  userid: number;

  @ManyToOne(() => PetChatRoom, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomid' })
  room: PetChatRoom;
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

  @CreateDateColumn()
  createdAt: Date;
}
