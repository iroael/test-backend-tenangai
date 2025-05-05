
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFeedbackDto {

  @ApiProperty({
    example: 'Aplikasi crash saat buka halaman profil',
    description: 'Judul feedback',
  })
  title: string;

  @ApiProperty({
    example: 'Saat saya klik menu profil, aplikasi langsung tertutup sendiri.',
    description: 'Isi detail feedback',
  })
  content: string;

  @ApiProperty({
    example: 'Bug',
    description: 'Kategori feedback (Bug, Saran, dll)',
    required: false,
  })
  category?: string;


  @ApiProperty({
    example: 'reviewed',
    enum: ['pending', 'reviewed', 'resolved'],
    description: 'Status feedback (wajib diisi)',
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
