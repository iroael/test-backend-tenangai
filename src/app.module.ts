import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule'; // ✅ import ini
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FeedbackModule } from './feedback/feedback.module';
import { Users } from './users/users.entity';
import { Feedback } from './feedback/feedback.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        autoLoadEntities: true,
        entities: [Users, Feedback],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    ScheduleModule.forRoot(), // ✅ tambahkan ini untuk mengaktifkan cron job
    AuthModule,
    UserModule,
    FeedbackModule,
  ],
})
export class AppModule {}
