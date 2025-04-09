import { uptime } from 'process';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PersonChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userid: number;

  @Column({})
  roomid: number;

  @CreateDateColumn()
  createdAt: Date;
}
