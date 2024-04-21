import { MedicalHistory } from '@prisma/client'
import { InboundEntity, UpdateData } from './repository'

export enum DbUpdateEventTypes {
  MedicalHistoryRowCreated = 'db-update.medical-row.created',
  MedicalHistoryRowDeleted = 'db-update.medical-row.deleted',
  MedicalHistoryRowUpdated = 'db-update.medical-row.updated',
}

type DbUpdateEventBase = { userId: number }

export type DbUpdateEvent =
  | MedicalHistoryRowCreatedEvent
  | MedicalHistoryRowDeletedEvent
  | MedicalHistoryRowUpdatedEvent

export interface MedicalHistoryRowCreatedEvent
  extends DbUpdateEventBase,
    InboundEntity<MedicalHistory> {}

export interface MedicalHistoryRowDeletedEvent
  extends DbUpdateEventBase,
    InboundEntity<MedicalHistory> {}

export interface MedicalHistoryRowUpdatedEvent extends DbUpdateEventBase {
  oldData: InboundEntity<MedicalHistory>
  newData: UpdateData<MedicalHistory>
}
