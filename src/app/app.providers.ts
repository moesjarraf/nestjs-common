import { APP_FILTER } from '@nestjs/core';
import { IndexExceptionFilter } from '../modules/exception/index-exception.filter';

export const commonAppProviders = [
  {
    provide: APP_FILTER,
    useClass: IndexExceptionFilter,
  },
];
