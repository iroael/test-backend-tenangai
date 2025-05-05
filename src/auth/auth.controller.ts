import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Login user dan generate JWT token' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, description: 'Berhasil login dan menerima JWT token' })
  @ApiResponse({ status: 401, description: 'Email atau password salah' })
  async login(@Body() AuthDto: AuthDto) {
    const user = await this.authService.validateUser(AuthDto.email, AuthDto.password);
    return this.authService.login(user);
  }
}
