import { Module } from '@nestjs/common'
import { DbEmitterService } from './db-emitter.service'
import { DbController } from './db.controller'
import { PrismaClient } from './prisma.client'
import { UpdateLoggerService } from './update-logger.service'

@Module({
  providers: [PrismaClient, UpdateLoggerService, DbEmitterService],
  exports: [PrismaClient, DbEmitterService],
  controllers: [DbController],
})
export class DbModule {}
