import { ConfigService } from './../config/config.service';
import { LoggerService } from './../logger/logger.service';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Injectable,
} from '@nestjs/common';

@Injectable()
@Catch()
export class InternalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
  ) {
    this.logger = this.logger.build(InternalExceptionFilter.name);
  }

  async catch(exception: Error, host: ArgumentsHost) {
    const time = new Date().toISOString();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 500;
    const path = request.path;
    const method = request.method;
    const message = this.config.debug
      ? exception.message
      : 'internal server error';
    const stack = exception.stack;

    this.logger.error(
      `'[${method}] ${path} (${status})' failed with ${message}`,
      {
        stack: stack || null,
      },
    );

    response.status(status).json({
      path,
      method,
      code: status,
      message,
      error: typeof message !== 'string' ? message : undefined,
      time,
    });
  }
}
