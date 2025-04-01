import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InBody } from './inbody.entity';
import { UserHashtag } from './hashtag.entity';
import { Report } from './report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userid: string; // 사용자가 입력하는 ID

  @Column()
  nickname: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ default: 0 })
  reportCnt: number;

  @OneToMany(() => InBody, (inbody) => inbody.user)
  inbodys: InBody[];

  @OneToMany(() => UserHashtag, (userHashtag) => userHashtag.user)
  hashtags: UserHashtag[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]; // 유저가 작성한 신고 리스트
}
