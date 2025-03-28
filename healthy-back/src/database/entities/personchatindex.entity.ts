import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PersonChatIndex {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({})
  userid: number;

  @Column({ length: 255, unique: true })
  roomid: string;

  @Column({})
  text: string;

  @Column({})
  userNickname: string;

  @CreateDateColumn()
  createdAt: Date;
}
