import { Global, Module } from '@nestjs/common';
import { ExceptionModule } from './filters/exception.module';
import { CaptchaModule } from './modules/captcha/captcha.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { EmitterModule } from './modules/emitter/emitter.module';
import { HttpAuthModule } from './modules/http-auth/http-auth.module';
import { LoggerModule } from './modules/logger/logger.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { RequestModule } from './modules/request/request.module';
import { SSLModule } from './modules/ssl/ssl.module';

export const CommonModuleConfig = {
  imports: [
    ConfigModule,
    LoggerModule,
    RequestModule,
    EmitterModule,
    DatabaseModule,
    SSLModule,
    MailerModule,
    HttpAuthModule,
    ExceptionModule,
    CaptchaModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    ConfigModule,
    LoggerModule,
    RequestModule,
    EmitterModule,
    DatabaseModule,
    SSLModule,
    MailerModule,
    HttpAuthModule,
    ExceptionModule,
    CaptchaModule,
  ],
};

@Global()
@Module(CommonModuleConfig)
export class CommonModule {}
