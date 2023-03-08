import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { EmitterModule } from './modules/emitter/emitter.module';
import { ExceptionModule } from './modules/exception/exception.module';
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
  ],
};

@Global()
@Module(CommonModuleConfig)
export class CommonModule {}
