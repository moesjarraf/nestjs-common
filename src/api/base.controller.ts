import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommonExceptionFilter } from '../modules/exception/common-exception.filter';

@UsePipes(new ValidationPipe({ whitelist: true }))
@UseFilters(CommonExceptionFilter)
export abstract class BaseApiController {}
