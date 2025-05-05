// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'Unique username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Valid email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd', description: 'User password (min 10 chars)' })
  @MinLength(10)
  password: string;
}
