import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async validateUser(email: string, pass: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { email, isActive: true } });
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Email atau password salah');
    }
    return user;
  }

  async login(user: Users) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      expires_in: '24h',
    };
  }
}
