// src/feedback/attachments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attachment } from './attachment.entity'; // Pastikan path ini sesuai dengan struktur folder Anda
import { CreateAttachmentDto } from './dto/create-attachment.dto';  // Pastikan DTO diimpor dengan benar

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectModel(Attachment.name) private readonly attModel: Model<Attachment>,
  ) {}

  async create(feedbackId: number, dto: CreateAttachmentDto): Promise<Attachment> {
    const doc = new this.attModel({ feedbackId, ...dto });
    return doc.save();
  }

  async findByFeedback(feedbackId: number): Promise<Attachment[]> {
    return this.attModel.find({ feedbackId }).exec();
  }
}
