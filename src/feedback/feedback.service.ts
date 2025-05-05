import {
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Cron } from '@nestjs/schedule';

import { Feedback } from './feedback.entity';
import { FeedbackTimeline } from './feedback-timeline.entity';
import { FeedbackReminder } from './feedback-reminder.entity';

import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { Users } from '../users/users.entity'; // Sesuaikan path jika beda

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);

  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,

    @InjectRepository(FeedbackTimeline)
    private readonly feedbackTimelineRepo: Repository<FeedbackTimeline>,

    @InjectRepository(FeedbackReminder)
    private readonly reminderRepo: Repository<FeedbackReminder>,

    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  async create(dto: CreateFeedbackDto, user: { userId: number }): Promise<Feedback> {
    const feedback = this.feedbackRepo.create({
      ...dto,
      user_id: user.userId,
    });

    const savedFeedback = await this.feedbackRepo.save(feedback);

    const timeline = this.feedbackTimelineRepo.create({
      feedback_id: savedFeedback.id,
      action_by: user.userId,
      action: 'Created',
      comment: 'Feedback submitted',
      status: dto.status,
    });
    await this.feedbackTimelineRepo.save(timeline);

    return savedFeedback;
  }

  findAll(): Promise<Feedback[]> {
    return this.feedbackRepo.find();
  }

  async findOne(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepo.findOneBy({ id });
    if (!feedback) throw new NotFoundException('Feedback not found');
    return feedback;
  }

  async update(id: number, dto: UpdateFeedbackDto): Promise<Feedback> {
    const feedback = await this.feedbackRepo.findOneBy({ id });
    if (!feedback) throw new NotFoundException('Feedback not found');

    Object.assign(feedback, dto);
    feedback.updated_at = new Date();
    return await this.feedbackRepo.save(feedback);
  }

  async remove(id: number): Promise<void> {
    const feedback = await this.feedbackRepo.findOneBy({ id });
    if (!feedback) throw new NotFoundException('Feedback not found');

    await this.feedbackRepo.delete(id);
  }

  async getFeedbackTimeline(id: number): Promise<FeedbackTimeline[]> {
    return this.feedbackTimelineRepo.find({
      where: { feedback_id: id },
      order: { created_at: 'DESC' },
    });
  }

  async changeStatus(id: number, dto: ChangeStatusDto, user: { userId: number }): Promise<Feedback> {
    const feedback = await this.feedbackRepo.findOneBy({ id });
    if (!feedback) throw new NotFoundException('Feedback not found');

    feedback.status = dto.status;
    const updated = await this.feedbackRepo.save(feedback);

    await this.feedbackTimelineRepo.save({
      feedback_id: id,
      action_by: user.userId,
      action: 'change_status',
      comment: dto.comment,
      status: dto.status,
    });

    return updated;
  }

}