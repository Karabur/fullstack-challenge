import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaClient } from './prisma.client'

@Controller('db')
@UseGuards(AuthGuard('jwt'))
export class DbController {
  constructor(private prisma: PrismaClient) {}

  @Get('change-list')
  async changeList() {
    // todo: this should be moved to service/repository
    return this.prisma.medicalHistoryUpdateLog.findMany({ include: { user: true } })
  }
}
