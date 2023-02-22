import { snakeCase } from 'snake-case';
import { ExceptionCodeI18n } from './../modules/exception/i18n/code.i18n';
import { LoggerService } from './../modules/logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InternalExceptionFilter } from './internal-exception.filter';

@Injectable()
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly internalException: InternalExceptionFilter,
  ) {
    this.logger = this.logger.build(HttpExceptionFilter.name);
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    if (!(exception instanceof HttpException)) {
      return this.internalException.catch(exception, host);
    }

    const time = new Date().toISOString();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const path = request.path;
    const method = request.method;
    const exResponse = exception.getResponse() as any;
    const message =
      typeof exResponse === 'string' || Array.isArray(exResponse)
        ? exResponse
        : exResponse.message || exResponse.error;
    const stack = exception.stack;
    const locale = request.locale;
    const type = typeof message === 'string' ? snakeCase(message) : undefined;
    const translation =
      ExceptionCodeI18n[type]?.[locale] ||
      ExceptionCodeI18n[HttpStatus[type?.toUpperCase?.()]]?.[locale];

    this.logger.debug(
      `'[${method}] ${path} (${status})' failed with ${message}`,
      {
        stack: stack || null,
      },
    );

    response.status(status).json({
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
