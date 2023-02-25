import { APP_FILTER } from '@nestjs/core';
import { CommonExceptionFilter } from '../modules/exception/common-exception.filter';

export const commonAppProviders = [
  {
    provide: APP_FILTER,
    useClass: CommonExceptionFilter,
  },
];
