import { User as PrismaUser } from '@prisma/client'

//can be extended to include more fields
export interface JWTPayload {
  // user id
  sub: number
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends PrismaUser {}
  }
}
