// src/feedback/dto/update-feedback.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsInt } from 'class-validator';

export class UpdateFeedbackDto {
  @ApiPropertyOptional({
    example: 'Judul feedback diperbarui',
    description: 'Judul feedback (opsional)',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'Isi konten feedback yang telah diperbarui untuk menjelaskan perubahan.',
    description: 'Isi detail feedback (opsional)',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    example: 'Improvement',
    description: 'Kategori feedback (opsional)',
  })
  @IsOptional()
  @IsString()
  category?: string;

  // @ApiProperty({
  //   example: 'reviewed',
  //   enum: ['pending', 'reviewed', 'resolved'],
  //   description: 'Status feedback (wajib diisi)',
  // })
  // @IsNotEmpty()
  // @IsString()
  // status: string;

  // @ApiProperty({
  //   example: 1,  // ID user yang sedang login (wajib diisi)
  //   description: 'ID User (wajib diisi)',
  // })
  // @IsNotEmpty()
  // @IsInt()
  // user_id: number;  // Pastikan user_id selalu ada pada payload
}
