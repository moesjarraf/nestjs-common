import { APP_FILTER } from '@nestjs/core';
import { IndexExceptionFilter } from '../filters/index-exception.filter';

export const commonAppProviders = [
  {
    provide: APP_FILTER,
    useClass: IndexExceptionFilter,
  }
];
