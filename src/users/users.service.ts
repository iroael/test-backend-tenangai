import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { ILike } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const { email } = createUserDto;

    // ❗ Cek apakah email sudah ada
    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find({ where: { isActive: true } });
  }

  async findAllDatatable(query: any) {
    const draw = Number(query.draw) || 1;
    const start = Number(query.start) || 0;
    const length = Number(query.length) || 10;
    const search = query['search[value]'] || '';
  
    const [data, total] = await this.userRepository.findAndCount({
      where: search
        ? [
            { username: ILike(`%${search}%`) },
            { email: ILike(`%${search}%`) },
          ]
        : {},
      skip: start,
      take: length,
      order: { id: 'DESC' },
    });
  
    return {
      draw,
      recordsTotal: total,
      recordsFiltered: search ? data.length : total,
      data,
    };
  }
  

  async findOne(id: number): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id, isActive: true } });
    if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
    // return this.userRepository.findOne({ where: { id, isActive: true } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);
    user.isActive = false; // Flagging as deleted (soft delete)
    await this.userRepository.save(user);
  }
}
