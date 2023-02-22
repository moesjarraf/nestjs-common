import { LoggerOptionsInterface } from './interfaces/logger.interface';
import { pascalCase } from 'pascal-case';
import { LoggerBuilderService } from './logger-builder.service';
import { Injectable, Optional } from '@nestjs/common';
import cliProgress from 'cli-progress';

@Injectable()
export class LoggerService {
  constructor(
    private readonly loggerBuilder: LoggerBuilderService,
    @Optional() private readonly context?: string,
  ) {}

  build(context?: string | object) {
    if (typeof context === 'object' || typeof context === 'function') {
      context = Object.getPrototypeOf(context).constructor.name;
    }

    return new LoggerService(this.loggerBuilder, pascalCase(context as string));
  }

  info(message: string, meta?: any, options?: LoggerOptionsInterface) {
    this.log('info', message, meta, options);
  }

  warn(message: string, meta?: any, options?: LoggerOptionsInterface) {
    this.log('warn', message, meta, options);
  }

  error(message: string, meta?: any, options?: LoggerOptionsInterface) {
    this.log('error', message, meta, options);
  }

  debug(message: string, meta?: any, options?: LoggerOptionsInterface) {
    this.log('debug', message, meta, options);
  }

  progress(total: number) {
    // @todo: see if we can make the progress bar sticky even if other stuff is printed to console
    const bar = new cliProgress.SingleBar(
      {
        stopOnComplete: true,
        hideCursor: true,
        forceRedraw: true,
      },
      cliProgress.Presets.shades_classic,
    );

    bar.start(total, 0);

    return bar;
  }

  async log(
    level: string,
    message: string,
    meta?: any,
    options?: LoggerOptionsInterface,
  ) {
    const config = this.loggerBuilder.getConfig();

    if (
      config.node.isEnv('test') &&
      options?.force !== true &&
      config.logger.force !== true
    ) {
      return;
    }

    const logger = this.loggerBuilder.getLogger();
    logger[level](message, {
      ...meta,
      context: this.context || LoggerService.name,
    });
  }
}
