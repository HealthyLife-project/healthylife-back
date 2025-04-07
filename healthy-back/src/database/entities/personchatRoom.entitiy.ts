import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PersonChatRoom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  userid: string;

  @Column()
  title: string;

  @Column({ length: 255, unique: true })
  time: string;

  @Column()
  cnt: Number;
  @CreateDateColumn()
  createdAt: Date;
}
