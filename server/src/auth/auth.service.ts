import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import argon2 from 'argon2'
import { PrismaClient } from '../db/prisma.client'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      return null
    }

    const passwordMatch = await argon2.verify(user.password, password)

    if (!passwordMatch) {
      return null
    }

    return user
  }

  generateJwt(user: User) {
    const payload = { sub: user.id }

    return this.jwtService.sign(payload)
  }
}
