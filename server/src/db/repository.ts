interface Entity {
  id: number
}

// todo: better name required
export type InboundEntity<T> = Omit<T, 'createdAt' | 'updatedAt'>
export type CreateData<T extends Entity> = InboundEntity<Omit<T, 'id'>>
export type UpdateData<T extends Entity> = InboundEntity<Partial<Omit<T, 'id'>>>

export interface Repository<T extends Entity> {
  list(): Promise<T[]>
  get(id: number): Promise<T>
  create(data: CreateData<T>): Promise<T>
  update(id: number, data: UpdateData<T>): Promise<T>
  delete(id: number): Promise<T>
}
