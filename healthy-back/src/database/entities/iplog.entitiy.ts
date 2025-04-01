import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IpLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext' })
  ipAddress: string;

  @Column({ type: 'longtext' })
  url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
