import {
  ArgumentMetadata,
  Body,
  Delete,
  Get,
  HttpCode,
  Injectable,
  NotFoundException,
  Param,
  Post,
  Query,
  Type,
  UsePipes,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { DatabaseEntityService } from '../modules/database/classes/entity-service.class';
import { DatabaseEntity } from '../modules/database/classes/entity.class';
import { ApiGetByIdParams } from './get-by-id.api';
import { ApiSearchQuery } from './search.api';

@Injectable()
export class AbstractValidationPipe extends ValidationPipe {
  constructor(
    options: ValidationPipeOptions,
    private readonly targetTypes: {
      body?: Type;
      query?: Type;
      param?: Type;
      custom?: Type;
    },
  ) {
    super(options);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const targetType = this.targetTypes[metadata.type];
    if (!targetType) {
      return super.transform(value, metadata);
    }
    return super.transform(value, { ...metadata, metatype: targetType });
  }
}

// @todo: support passing generic get by id
// GetByIdParams: Type = ApiGetByIdParams, // unable to make this generic, @ApiParam({ type: GetByIdParams }) requires a name
export function CreateCrudApiController(
  AddDto: Type,
  UpdateDto: Type,
  SearchQuery: Type = ApiSearchQuery,
) {
  @UsePipes(new ValidationPipe({ whitelist: true }))
  class CrudApiController {
    constructor(readonly service: DatabaseEntityService<DatabaseEntity>) {}

    @UsePipes(
      new AbstractValidationPipe(
        { whitelist: true, transform: true },
        { query: SearchQuery },
      ),
    )
    @ApiQuery({ type: SearchQuery })
    @Get()
    async list(@Query() query) {
      return this.service.list({}, query as any);
    }

    @UsePipes(
      new AbstractValidationPipe(
        { whitelist: true, transform: true },
        { param: ApiGetByIdParams },
      ),
    )
    @Get(':id')
    async get(@Param() params: ApiGetByIdParams) {
      const result = await this.service.get(params.id);
      if (!result) {
        throw new NotFoundException();
      }
      return result;
    }

    @UsePipes(
      new AbstractValidationPipe(
        { whitelist: true, transform: true },
        { body: AddDto },
      ),
    )
    @ApiBody({ type: AddDto })
    @HttpCode(201)
    @Post()
    async add(@Body() body) {
      return this.service.add(body as any);
    }

    @UsePipes(
      new AbstractValidationPipe(
        { whitelist: true, transform: true },
        { body: UpdateDto, param: ApiGetByIdParams },
      ),
    )
    @ApiBody({ type: UpdateDto })
    @Post(':id')
    async update(@Body() body, @Param() params: ApiGetByIdParams) {
      const result = await this.service.get(params.id);

      if (!result) {
        throw new NotFoundException();
      }

      return this.service.update(result, body as any);
    }

    @UsePipes(
      new AbstractValidationPipe(
        { whitelist: true, transform: true },
        { param: ApiGetByIdParams },
      ),
    )
    @HttpCode(204)
    @Delete(':id')
    async delete(@Param() params: ApiGetByIdParams) {
      const result = await this.service.get(params.id);

      if (!result) {
        throw new NotFoundException();
      }

      await this.service.delete(result);
    }
  }

  return CrudApiController;
}
