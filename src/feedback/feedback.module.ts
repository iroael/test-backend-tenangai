// src/feedback/feedback.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback } from './feedback.entity';
import { FeedbackTimeline } from './feedback-timeline.entity';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { UserModule } from '../users/users.module';
import { FeedbackReminder } from './feedback-reminder.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { Users } from '../users/users.entity';
import { FeedbackScheduler } from './feedback.schedule';
import { Attachment, AttachmentSchema } from './attachment.entity';
import { AttachmentsService } from './attachments.service'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback, FeedbackTimeline, FeedbackReminder, Users]),
    MongooseModule.forFeature([{ name: Attachment.name, schema: AttachmentSchema }]),
    UserModule, // Daftarkan UserModule untuk dependency injection
    ScheduleModule.forRoot()
  ],
  providers: [FeedbackService, FeedbackScheduler, AttachmentsService],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
