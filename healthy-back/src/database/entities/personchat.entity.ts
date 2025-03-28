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
  chatCreateUserid: number;

  @Column({ length: 255, unique: true })
  time: string;

  @Column({ length: 255, unique: true })
  imgsrc: string;

  @Column({})
  check: boolean;

  @Column({ nullable: true })
  password: string;

  @Column({})
  title: string;

  @CreateDateColumn()
  createdAt: Date;
}
