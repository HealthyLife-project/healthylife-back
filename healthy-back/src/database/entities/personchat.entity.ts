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

  @Column({ unique: true })
  chatid: number;

  @CreateDateColumn()
  createdAt: Date;
}
