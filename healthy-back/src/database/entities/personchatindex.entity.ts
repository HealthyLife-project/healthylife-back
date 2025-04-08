import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PersonChatIndex {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({})
  userid: number;

  @Column({ unique: true })
  roomid: number;

  @Column({})
  text: string;

  @Column({})
  userNickname: string;

  @Column({})
  time: string;
}
