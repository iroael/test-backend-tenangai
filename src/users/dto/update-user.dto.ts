// src/users/dto/update-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'johndoe', required: false })
  username?: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  email?: string;

  @ApiProperty({ example: 'securePassword123', required: false })
  password?: string;

  @ApiProperty({ example: true, required: false })
  isActive?: boolean;
}
