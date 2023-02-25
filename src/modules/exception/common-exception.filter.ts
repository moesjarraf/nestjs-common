import { ConfigService } from '../config/config.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InternalExceptionFilter } from './internal-exception.filter';
import { IndexExceptionFilter } from './index-exception.filter';

@Injectable()
@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  constructor(
    public readonly config: ConfigService,
    public readonly indexException: IndexExceptionFilter,
    public readonly internalException: InternalExceptionFilter,
  ) {}

  async catch(exception: Error, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return this.indexException.catch(exception, host);
    }

    return this.internalException.catch(exception, host);
  }
}
