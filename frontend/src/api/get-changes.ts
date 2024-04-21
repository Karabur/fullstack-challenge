import type { MedicalHistoryUpdateLog, User } from '@prisma/client'

export type Change = Omit<MedicalHistoryUpdateLog, 'createdAt' | 'updatedAt'> & {
  user: User
  createdAt: string
  updatedAt: string
}

export default async function getChanges(): Promise<Change[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/db/change-list`, {
    credentials: 'include',
  })
  if (res.status !== 200) {
    throw new Error('Failed to fetch changes')
  }
  return res.json()
}
