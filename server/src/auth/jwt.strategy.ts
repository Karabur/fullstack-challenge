/* istanbul ignore file */
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AppConfigService } from '../config/app-config.service'
import { PrismaClient } from '../db/prisma.client'
import { JWTPayload } from './types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private appConfigService: AppConfigService, private prisma: PrismaClient) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => this.tokenFromRequest(req),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: appConfigService.auth.jwtSecret,
      passReqToCallback: true,
    })
  }

  tokenFromRequest(req: Request): string | null {
    if (req.cookies) {
      const currentToken = req.cookies[this.appConfigService.auth.jwtCookieName]

      if (typeof currentToken === 'string') {
        return currentToken
      }
    }

    return null
  }

  async validate(req: Request, payload: JWTPayload) {
    const { sub } = payload
    if (!sub) {
      return null
    }
    return this.prisma.user.findUnique({
      where: {
        id: sub,
      },
    })
  }
}
