import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { UpdateType } from '@prisma/client'
import { isNil, omitBy } from 'lodash'
import {
  DbUpdateEventTypes,
  MedicalHistoryRowCreatedEvent,
  MedicalHistoryRowUpdatedEvent,
} from './events'
import { PrismaClient } from './prisma.client'

@Injectable()
export class UpdateLoggerService {
  constructor(private prisma: PrismaClient) {}
  @OnEvent(DbUpdateEventTypes.MedicalHistoryRowCreated)
  async handleMedicalHistoryCreateEvent(event: MedicalHistoryRowCreatedEvent) {
    await this.prisma.medicalHistoryUpdateLog.create({
      data: {
        type: UpdateType.Create,
        data: {
          id: event.id,
          patient: event.patient,
          condition: event.condition,
          allergies: event.allergies,
          surgeries: event.surgeries,
        },
        userId: event.userId,
      },
    })
  }

  @OnEvent(DbUpdateEventTypes.MedicalHistoryRowDeleted)
  async handleMedicalHistoryDeletedEvent(event: MedicalHistoryRowCreatedEvent) {
    await this.prisma.medicalHistoryUpdateLog.create({
      data: {
        type: UpdateType.Delete,
        oldData: {
          id: event.id,
          patient: event.patient,
          condition: event.condition,
          allergies: event.allergies,
          surgeries: event.surgeries,
        },
        userId: event.userId,
      },
    })
  }

  @OnEvent(DbUpdateEventTypes.MedicalHistoryRowUpdated)
  async handleMedicalHistoryUpdatedEvent(event: MedicalHistoryRowUpdatedEvent) {
    const oldData = {
      id: event.oldData.id,
      patient: event.oldData.patient,
      condition: event.oldData.condition,
      allergies: event.oldData.allergies,
      surgeries: event.oldData.surgeries,
    }

    await this.prisma.medicalHistoryUpdateLog.create({
      data: {
        type: UpdateType.Update,
        oldData,
        data: omitBy(event.newData, isNil),
        userId: event.userId,
      },
    })
  }
}
