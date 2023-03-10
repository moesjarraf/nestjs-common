import {
  Get,
  Post,
  Delete,
  Body,
  Query,
  Param,
  NotFoundException,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DatabaseEntity } from '../modules/database/classes/entity.class';
import { DatabaseEntityService } from '../modules/database/classes/entity-service.class';

@UsePipes(new ValidationPipe({ whitelist: true }))
export abstract class CrudApiController {
  constructor(
    protected readonly service: DatabaseEntityService<DatabaseEntity>,
  ) {}

  @Get()
  async list(@Query() query) {
    return this.service.list({}, query as any);
  }

  @Get(':id')
  async get(@Param() params) {
    const result = await this.service.get(params.id);

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  @HttpCode(201)
  @Post()
  async add(@Body() body) {
    return this.service.add(body as any);
  }

  @Post(':id')
  async update(@Body() body, @Param() params) {
    const result = await this.service.get(params.id);

    if (!result) {
      throw new NotFoundException();
    }

    return this.service.update(result, body as any);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param() params) {
    const result = await this.service.get(params.id);

    if (!result) {
      throw new NotFoundException();
    }

    await this.service.delete(result);
  }
}
