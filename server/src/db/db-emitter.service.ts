import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
  DbUpdateEvent,
  DbUpdateEventTypes,
  MedicalHistoryRowCreatedEvent,
  MedicalHistoryRowDeletedEvent,
  MedicalHistoryRowUpdatedEvent,
} from './events'

@Injectable()
export class DbEmitterService {
  constructor(private eventEmitter: EventEmitter2) {}

  // this allows to strictly type the payload of the event
  // another option would be to use a discriminated union and have `type` to be part of the payload
  emitChange(
    type: DbUpdateEventTypes.MedicalHistoryRowCreated,
    payload: MedicalHistoryRowCreatedEvent
  ): void
  emitChange(
    type: DbUpdateEventTypes.MedicalHistoryRowDeleted,
    payload: MedicalHistoryRowDeletedEvent
  ): void
  emitChange(
    type: DbUpdateEventTypes.MedicalHistoryRowUpdated,
    payload: MedicalHistoryRowUpdatedEvent
  ): void
  emitChange(type: DbUpdateEventTypes, payload: DbUpdateEvent) {
    this.eventEmitter.emit(type, payload)
  }
}
