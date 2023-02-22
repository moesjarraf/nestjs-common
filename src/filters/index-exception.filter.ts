import { ConfigService } from './../modules/config/config.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggerService } from '../modules/logger/logger.service';
import { fileExists } from '../utils/file-exists.util';

@Injectable()
@Catch(HttpException)
export class IndexExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly config: ConfigService,
    private readonly httpException: HttpExceptionFilter,
    private readonly logger: LoggerService,
  ) {
    this.logger = logger.build(IndexExceptionFilter.name);
  }

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const path = request.path;
    const index = this.config.frontend.index;

    if (
      status === 404 &&
      index &&
      !path.startsWith('/api') &&
      (await fileExists(index))
    ) {
      return response.sendFile(index);
    }

    return this.httpException.catch(exception, host);
  }
}
