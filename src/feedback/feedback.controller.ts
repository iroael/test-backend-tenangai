import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
  Patch,
  Req,Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, 
  ApiOperation,
  ApiResponse,
  ApiParam, } from '@nestjs/swagger';
import { ChangeStatusDto } from './dto/change-status.dto';
import { FeedbackTimeline } from '../feedback/feedback-timeline.entity';
import { GetFeedbackDto } from './dto/get-feedback.dto';

@ApiTags('Feedbacks')
@ApiBearerAuth('JWT')
@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() dto: CreateFeedbackDto, @Request() req) {
    // console.log('User ID:', req.user.userId);  // Cek di sini apakah `user.id` ada
    return this.feedbackService.create(dto, req.user); // req.user = { id, email }
  }

  
  @Get()
  async findAllAdmin(
    @Query() query: GetFeedbackDto,
    @Request() req: any,
  ) {
    return this.feedbackService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateFeedbackDto) {
    return this.feedbackService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }

  @Get(':id/timeline')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get feedback timeline',
    description: 'Mengambil seluruh riwayat (timeline) perubahan status dari suatu feedback',
  })
  @ApiParam({
    name: 'id',
    description: 'ID feedback yang ingin diambil timelinenya',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Daftar timeline feedback berhasil diambil',
    type: FeedbackTimeline,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Feedback tidak ditemukan' })
  getTimeline(@Param('id', ParseIntPipe) id: number): Promise<FeedbackTimeline[]> {
    return this.feedbackService.getFeedbackTimeline(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async changeStatus(
    @Param('id') id: string,
    @Body() dto: ChangeStatusDto,
    @Req() req: any,
  ) {
    return this.feedbackService.changeStatus(+id, dto, { userId: req.user.userId });
  }
}
