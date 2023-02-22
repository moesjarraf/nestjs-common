import { Module } from '@nestjs/common';
import { captchaProviders } from './captcha.providers';
import { CaptchaService } from './captcha.service';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '../config/config.module';
import { CaptchaGuard } from './captcha.guard';
import { CaptchaMiddleware } from './captcha.middleware';

export const CaptchaModuleConfig = {
  imports: [LoggerModule, ConfigModule],
  controllers: [],
  providers: [
    CaptchaService,
    CaptchaGuard,
    CaptchaMiddleware,
    ...captchaProviders,
  ],
  exports: [
    CaptchaService,
    CaptchaGuard,
    CaptchaMiddleware,
    ...captchaProviders,
  ],
};

@Module(CaptchaModuleConfig)
export class CaptchaModule { }
