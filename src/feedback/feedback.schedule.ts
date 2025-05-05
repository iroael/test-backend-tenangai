import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { FeedbackReminder } from './feedback-reminder.entity';
import { Users } from '../users/users.entity';

@Injectable()
export class FeedbackScheduler {
  private readonly logger = new Logger(FeedbackScheduler.name);

  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,

    @InjectRepository(FeedbackReminder)
    private readonly reminderRepo: Repository<FeedbackReminder>,

    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  // Cron dijalankan setiap 10 detik (untuk testing)
//   @Cron('*/30 * * * * *')
  async remindUsersNoFeedback() {
    const thresholdDays = 1;
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - thresholdDays);

    this.logger.log('⏰ Menjalankan pengecekan reminder feedback...');

    const users = await this.userRepo.find({ where: { isActive: true } });
    // console.log(users);
    for (const user of users) {
      const hasFeedback = await this.feedbackRepo.count({
        where: { user_id: user.id },
      });

      if (hasFeedback === 0) {
        const reminder = await this.reminderRepo.findOne({
          where: { user_id: user.id },
        });

        const now = new Date();

        if (!reminder || (reminder.last_reminded_at && reminder.last_reminded_at < thresholdDate)) {
          await this.reminderRepo.save({
            user_id: user.id,
            last_reminded_at: now,
          });

          this.logger.log(`📨 Reminder dikirim ke user ID ${user.id}`);
        } else {
          this.logger.log(`✅ User ID ${user.id} sudah diingatkan pada ${reminder?.last_reminded_at}`);
        }
      }
    }
  }
}
