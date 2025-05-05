import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

// Enum untuk status
export enum FeedbackStatus {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Archived = 'Archived',
}

export class ChangeStatusDto {
  @ApiProperty({
    description: 'Status of the feedback',
    example: 'In Progress',
    enum: FeedbackStatus,
  })
  @IsEnum(FeedbackStatus, { message: 'Status must be a valid value' })
  status: FeedbackStatus;

  @ApiProperty({
    description: 'Comment or note regarding the status change',
    example: 'Feedback is being processed.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment: string;
}
