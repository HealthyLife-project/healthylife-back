import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PetChatIndex {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({})
  userid: number;

  @Column({})
  roomid: number;

  @Column({})
  text: string;

  @Column({})
  userNickname: string;

  @Column()
  time: string;
}
