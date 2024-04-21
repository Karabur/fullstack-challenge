import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common'
import { Response } from 'express'
import { AppConfigService } from '../config/app-config.service'
import { AuthService } from './auth.service'
import { LoginDTO } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private config: AppConfigService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDTO, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const jwt = this.authService.generateJwt(user)
    response.cookie(this.config.auth.jwtCookieName, jwt, {
      httpOnly: true,
      sameSite: 'lax',
    })
    return user
  }
}
