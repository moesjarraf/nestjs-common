import { commonAppProviders } from './app.providers';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from '..';
import { SSLMiddleware } from '../modules/ssl/ssl.middleware';
import { HttpAuthMiddleware } from '../modules/http-auth/http-auth.middleware';

export const AppModuleConfig = {
  imports: [CommonModule],
  controllers: [AppController],
  providers: [...commonAppProviders],
  exports: [],
};

@Module(AppModuleConfig)
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      SSLMiddleware,
      HttpAuthMiddleware,
    ).forRoutes('*');
  }
}
