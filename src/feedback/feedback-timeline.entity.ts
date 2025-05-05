// src/feedback/entities/feedback-timeline.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Feedback } from './feedback.entity';
import { Users } from '../users/users.entity';

@Entity('feedback_timelines')
export class FeedbackTimeline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  feedback_id: number;

  @Column()
  action_by: number;

  @Column({ length: 50 })
  action: string;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ length: 20 })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Feedback, (feedback) => feedback.timelines)
  @JoinColumn({ name: 'feedback_id' })
  feedback: Feedback;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'action_by' })
  user: Users;
}
