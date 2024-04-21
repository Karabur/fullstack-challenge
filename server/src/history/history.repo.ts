import { Injectable } from '@nestjs/common'
import { MedicalHistory } from '@prisma/client'
import { PrismaClient } from '../db/prisma.client'
import { CreateData, Repository, UpdateData } from '../db/repository'

@Injectable()
export class HistoryRepo implements Repository<MedicalHistory> {
  constructor(private prisma: PrismaClient) {}

  get(id: number) {
    return this.prisma.medicalHistory.findUnique({ where: { id } })
  }

  create(data: CreateData<MedicalHistory>) {
    return this.prisma.medicalHistory.create({ data })
  }

  update(id: number, data: UpdateData<MedicalHistory>) {
    return this.prisma.medicalHistory.update({
      where: { id },
      data,
    })
  }

  delete(id: number) {
    return this.prisma.medicalHistory.delete({ where: { id } })
  }

  // TODO: this should support pagination
  list() {
    return this.prisma.medicalHistory.findMany()
  }
}
