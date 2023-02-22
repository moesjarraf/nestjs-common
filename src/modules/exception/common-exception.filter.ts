import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { InternalExceptionFilter } from './internal-exception.filter';

@Injectable()
@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  constructor(
    public readonly config: ConfigService,
    private readonly logger: LoggerService,
    public readonly httpException: HttpExceptionFilter,
    public readonly internalException: InternalExceptionFilter,
  ) {
    this.logger = this.logger.build(CommonExceptionFilter.name);
  }

  async catch(exception: Error, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return this.httpException.catch(exception, host);
    }

    if (this.config.node.isEnv('development')) {
      this.logger.error(exception.stack);
    }

    return this.internalException.catch(exception, host);
  }
}
