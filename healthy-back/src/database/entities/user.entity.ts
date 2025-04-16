import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { InBody } from './inbody.entity';
import { UserHashtag } from './hashtag.entity';
import { Report } from './report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  userid: string; // 사용자가 입력하는 ID

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  age: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ default: 0, nullable: true })
  reportCnt: number;

  @Column({ default: false, nullable: true })
  premium: boolean;

  @Column({ default: false, nullable: true })
  admin: boolean;

  @OneToMany(() => InBody, (inbody) => inbody.user)
  inbodys: InBody[];

  @OneToMany(() => UserHashtag, (userHashtag) => userHashtag.user)
  hashtags: UserHashtag[];

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[]; // 유저가 작성한 신고 리스트
}
