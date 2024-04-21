/* istanbul ignore file */

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration } from './configuration'


@Injectable()
export class AppConfigService implements Configuration {
  constructor(private configService: ConfigService<Configuration, true>) {
    const { jwtSecret } = this.auth
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not defined')
    }
  }

  get port() {
    return this.configService.get<number>('port')
  }

  get auth() {
    return this.configService.get<Configuration['auth']>('auth')
  }
}
