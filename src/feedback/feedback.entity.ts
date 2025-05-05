// src/feedback/feedback.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';  // Import Users entity
import { FeedbackTimeline } from './feedback-timeline.entity';  // Import FeedbackTimeline entity

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  category: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (user) => user.feedbacks)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => FeedbackTimeline, (timeline) => timeline.feedback)
  timelines: FeedbackTimeline[];
}
