import { ExceptionCodeI18n } from './../modules/exception/i18n/code.i18n';
import { snakeCase } from 'snake-case';
import { ConfigService } from './../modules/config/config.service';
import { LoggerService } from './../modules/logger/logger.service';
import { ExceptionFilter, Catch, ArgumentsHost, Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
@Catch()
export class InternalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
  ) {
    this.logger = this.logger.build(InternalExceptionFilter.name)
  }

  async catch(exception: Error, host: ArgumentsHost) {
    const time = new Date().toISOString();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 500;
    const path = request.path;
    const method = request.method;
    const message = this.config.debug ? exception.message : 'internal server error';
    const stack = exception.stack;
    const locale = request.locale;
    const type = typeof message === 'string' ? snakeCase(message) : undefined;
    const translation = ExceptionCodeI18n[type]?.[locale] ||
      ExceptionCodeI18n[HttpStatus[type?.toUpperCase?.()]]?.[locale];

    this.logger.error(`'[${method}] ${path} (${status})' failed with ${message}`, {
      stack: stack || null
    });

    response
      .status(status)
      .json({
        path,
        method,
        code: status,
        message: typeof message !== 'string' ? undefined : translation || message,
        error: typeof message !== 'string' ? message : undefined,
        type: translation ? type : undefined,
        time,
      });
  }
}
