import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';

@Entity('feedback_reminders')
export class FeedbackReminder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'timestamp', nullable: true })
  last_reminded_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
