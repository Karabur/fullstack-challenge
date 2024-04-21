import { Module } from '@nestjs/common'
import { DbModule } from '../db/db.module'
import { HistoryController } from './history.controller'
import { HistoryRepo } from './history.repo'

@Module({
  imports: [DbModule],
  controllers: [HistoryController],
  providers: [HistoryRepo],
})
export class HistoryModule {}
