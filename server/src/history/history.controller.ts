import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ChangesInterceptor } from './changes.interceptor'
import { CreateMedicalRecordDTO, UpdateMedicalRecordDTO } from './dto'
import { HistoryRepo } from './history.repo'

@Controller('history')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ChangesInterceptor)
export class HistoryController {
  constructor(private historyRepo: HistoryRepo) {}

  @Get('list')
  list() {
    return this.historyRepo.list()
  }

  @Post('record')
  async createRecord(@Body() body: CreateMedicalRecordDTO) {
    try {
      return await this.historyRepo.create(body)
    } catch (e) {
      throw new BadRequestException('Record not created')
    }
  }

  @Delete('record/:id')
  async deleteRecord(@Param('id', new ParseIntPipe()) id: number) {
    try {
      return await this.historyRepo.delete(id)
    } catch (e) {
      // todo: distinguish between different types of errors
      throw new NotFoundException('Record not found')
    }
  }

  @Patch('record/:id')
  async updateRecord(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateMedicalRecordDTO
  ) {
    try {
      return await this.historyRepo.update(id, body)
    } catch (e) {
      // todo: distinguish between different types of errors
      throw new NotFoundException('Record not found')
    }
  }
}
