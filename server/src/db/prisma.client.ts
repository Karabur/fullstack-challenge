/* istanbul ignore file */
import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient as PrismaClientBase } from '@prisma/client'

@Injectable()
export class PrismaClient extends PrismaClientBase implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }
}
