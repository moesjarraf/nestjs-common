import { INestApplication, NestModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import bodyParser from 'body-parser';
import cloneBuffer from 'clone-buffer';
import cookie from 'cookie-parser';
import cors from 'cors';
import { Request } from 'express';
import helmet, { HelmetOptions } from 'helmet';
import path from 'path';
import { LoggerService } from '../../modules/logger/logger.service';
import { ConfigService } from '../../modules/config/config.service';

declare const module: any;

export class Main {
  constructor(protected appModule: any) {}

  async swagger(app: INestApplication, config: ConfigService) {
    const unbuild = new DocumentBuilder()
      .setTitle(config.app.name)
      .setDescription(config.app.description)
      .addBearerAuth()
      .addServer('/');

    const options = unbuild.build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
  }

  async bootstrap() {
    let logger: LoggerService = undefined;

    process.on('warning', (e) => {
      logger
        ? logger.warn(`nodejs: ${e}`, { stack: e.stack })
        : console.warn(e.stack);
    });

    const app = await NestFactory.create<NestExpressApplication>(
      this.appModule,
      {
        bodyParser: false,
        logger: ['error', 'warn'],
      },
    );

    const config = app.get<ConfigService>(ConfigService);
    logger = app.get<LoggerService>(LoggerService).build(Main.name);

    app.set('trust proxy', true); // @note: gives access to ip in request
    app.set('view engine', 'ejs');
    app.set('views', path.resolve(__dirname, './views'));

    await this.swagger(app, config);

    if (config.frontend.dist) {
      app.useStaticAssets(config.frontend.dist, { index: false });
    }

    const helmetOptions: HelmetOptions = {};
    if (!config.ssl.enabled) {
      helmetOptions.hsts = false;
    }
    if (config.node.isEnv(['development', 'staging'])) {
      helmetOptions.frameguard = false;
    }
    app.use(cors(await config.cors));
    app.use(cookie());
    app.use(helmet(helmetOptions));
    app.use(
      bodyParser.json({
        verify: (req: Request, res, buf) => {
          (req as any).rawBody =
            Buffer.isBuffer(buf) &&
            config.body_parser.isRawPath(req.path) &&
            cloneBuffer(buf);

          return true;
        },
      }),
    );
    app.use(bodyParser.urlencoded({ extended: false }));

    await app.listen(config.port);

    logger.info(`running on http://localhost:${config.port}`);
    logger.info(`using env ${config.node.env}`);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  }
}
