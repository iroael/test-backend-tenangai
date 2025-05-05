// src/feedback/dto/create-attachment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateAttachmentDto {
  @ApiProperty({ example: 'https://cdn.example.com/file.png' })
  @IsNotEmpty() @IsUrl()
  fileUrl: string;

  @ApiProperty({ example: 'file.png' })
  @IsNotEmpty() @IsString()
  fileName: string;

  @ApiProperty({ example: 'image/png' })
  @IsNotEmpty() @IsString()
  fileType: string;
}
