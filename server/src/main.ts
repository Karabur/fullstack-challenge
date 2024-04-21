import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import express from 'express'
import { AppModule } from './app.module'
import { AppConfigService } from './config/app-config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(AppConfigService)
  app.enableCors({
    origin: 'http://localhost:3233',
    credentials: true,
  })

  app.use(express.json({ limit: '10mb' }))
  app.use(cookieParser())

  await app.listen(configService.port)
}

bootstrap()
