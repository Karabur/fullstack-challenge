import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { MedicalHistory, User } from '@prisma/client'
import { Request } from 'express'
import { tap } from 'rxjs'
import { DbEmitterService } from '../db/db-emitter.service'
import { DbUpdateEventTypes } from '../db/events'
import { PrismaClient } from '../db/prisma.client'
import { UpdateMedicalRecordDTO } from './dto'

@Injectable()
export class ChangesInterceptor implements NestInterceptor {
  constructor(private dbEmitterService: DbEmitterService, private prisma: PrismaClient) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const httpContext = context.switchToHttp()
    const request = httpContext.getRequest<Request>()
    const id = request.params.id
    const { user } = request

    const method = request.method
    let oldData: MedicalHistory | null = null
    if (method === 'PATCH') {
      oldData = await this.prisma.medicalHistory.findUnique({ where: { id: Number(id) } })
    }

    return next.handle().pipe(
      tap((data) => {
        if (method === 'POST') {
          this.logCreate(user, data)
        }
        if (method === 'DELETE') {
          this.logDelete(user, data)
        }
        if (method === 'PATCH') {
          this.logUpdate(user, request.body, oldData)
        }
      })
    )
  }

  logCreate(user: User, data: MedicalHistory) {
    this.dbEmitterService.emitChange(DbUpdateEventTypes.MedicalHistoryRowCreated, {
      userId: user.id,
      ...data,
    })
  }

  logDelete(user: User, data: MedicalHistory) {
    this.dbEmitterService.emitChange(DbUpdateEventTypes.MedicalHistoryRowDeleted, {
      userId: user.id,
      ...data,
    })
  }

  logUpdate(user: User, data: UpdateMedicalRecordDTO, oldData: MedicalHistory) {
    this.dbEmitterService.emitChange(DbUpdateEventTypes.MedicalHistoryRowUpdated, {
      userId: user.id,
      newData: data,
      oldData: oldData,
    })
  }
}
