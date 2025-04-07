import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PetChatRoom {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true, nullable: true })
  userid: string;

  @Column({ nullable: true })
  title: string;

  @Column({ length: 255, unique: true, nullable: true })
  time: string;
  @Column({ nullable: true })
  cnt: Number;
  @CreateDateColumn()
  createdAt: Date;
}
