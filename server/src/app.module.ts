import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { AuthModule } from './auth/auth.module'
import { DbModule } from './db/db.module'
import { HistoryModule } from './history/history.module'

@Module({
  imports: [ConfigModule, AuthModule, DbModule, HistoryModule, EventEmitterModule.forRoot()],
})
export class AppModule {}
