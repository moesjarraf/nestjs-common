import { ConfigService } from '../modules/config/config.service';
import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Response } from 'express';
import { fileExists } from '../utils/file-exists.util';

@Controller()
export class AppController {
  constructor(protected readonly config: ConfigService) {}

  @Get()
  @ApiExcludeEndpoint()
  async root(@Res() res: Response): Promise<void> {
    const index = this.config.frontend.index;

    // @note: load local index file for single page applications
    if (await fileExists(index)) {
      return res.sendFile(index);
    }

    // @todo: support loading index file from s3

    return res.redirect('/api');
  }

  @Get('api')
  @ApiExcludeEndpoint()
  async api(@Res() res: Response): Promise<void> {
    return res.redirect('/api-docs');
  }
}
