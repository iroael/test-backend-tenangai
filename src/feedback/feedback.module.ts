// src/feedback/feedback.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { FeedbackTimeline } from './feedback-timeline.entity';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { UserModule } from '../users/users.module';
import { FeedbackReminder } from './feedback-reminder.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { Users } from '../users/users.entity';
import { FeedbackScheduler } from './feedback.schedule'; // Import FeedbackScheduler

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback, FeedbackTimeline, FeedbackReminder, Users]),
    UserModule, // Daftarkan UserModule untuk dependency injection
    ScheduleModule.forRoot()
  ],
  providers: [FeedbackService,FeedbackScheduler],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
