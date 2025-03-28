import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class InBodyData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.inbodys, { onDelete: 'CASCADE' })
  user: User;

  @Column('float')
  value: string;

  @CreateDateColumn()
  createdAt: Date;
}
