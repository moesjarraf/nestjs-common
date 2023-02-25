import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { boolean } from 'boolean';
import { dirname, join } from 'path';

@Injectable()
export class ConfigService extends NestConfigService {
  get app() {
    return {
      name: this.get<string>('APP_NAME') || 'Application',
      short_name: this.get<string>('APP_SHORT_NAME') || 'App',
      description: this.get<string>('APP_DESCRIPTION'),
    };
  }

  get node() {
    const nodeEnv = this.get<string>('NODE_ENV') || 'development';

    return {
      env: nodeEnv,
      isEnv: (env: string | string[]) =>
        typeof env === 'string' ? env === nodeEnv : env.includes(nodeEnv),
    };
  }

  get port() {
    return Number(this.get<string>('PORT')) || 3000;
  }

  get debug() {
    return (
      boolean(this.get<string>('DEBUG')) ||
      (this.node.isEnv('production') ? false : true)
    );
  }

  get frontend() {
    const index = this.get<string>('FRONTEND_INDEX') || '';
    const indexFullPath = index ? join(process.cwd(), index) : undefined;

    return {
      index: indexFullPath,
      dist: indexFullPath ? dirname(indexFullPath) : undefined,
    };
  }

  get cors() {
    const origin = (this.get<string>('CORS_ORIGIN') || '*')
      .split(',')
      .map((string) => (string !== '*' ? new RegExp(string) : string));

    const credentials = boolean(this.get<string>('CORS_CREDENTIALS')) || false;
    const exposedHeaders =
      this.get<string>('CORS_EXPOSED_HEADERS') || undefined;

    return {
      origin,
      credentials,
      exposedHeaders,
    };
  }

  get body_parser() {
    const paths = this.get<string>('BODY_PARSER_RAW_PATHS') || '';

    return {
      isRawPath: (path) =>
        paths
          .split(',')
          .map((item) => path.match(item))
          .filter((item) => Boolean(item)),
    };
  }

  get captcha() {
    return {
      site_key: this.get<string>('CAPTCHA_SITE_KEY'),
      secret_key: this.get<string>('CAPTCHA_SITE_KEY'),
      enabled: boolean(this.get<string>('CAPTCHA_ENABLED')),
    };
  }

  get mongo() {
    return {
      default_url:
        this.get<string>('MONGO_DEFAULT_URL') ||
        'mongodb://0.0.0.0:27017/nestjs',
    };
  }

  get http_auth() {
    return {
      bearer_token: this.get<string>('HTTP_AUTH_BEARER_TOKEN'),
    };
  }

  get logger() {
    return {
      level: this.get<string>('LOGGER_LEVEL'),
      force: boolean(this.get<string>('LOGGER_FORCE')),
    };
  }

  get rollbar() {
    return {
      access_token: this.get<string>('ROLLBAR_ACCESS_TOKEN'),
      environment: boolean(this.get<string>('ROLLBAR_ENVIRONMENT')),
      level: boolean(this.get<string>('ROLLBAR_LEVEL')),
    };
  }

  get mailer() {
    return {
      test: boolean(this.get<string>('MAILER_TEST')),
      options: {
        host: this.get<string>('MAILER_HOST'),
        port: this.get<string>('MAILER_PORT'),
        secure: boolean(this.get<string>('MAILER_SECURE')),
        user: this.get<string>('MAILER_USER'),
        pass: this.get<string>('MAILER_PASS'),
      },
    };
  }

  get ssl() {
    return {
      enabled: boolean(this.get<string>('SSL_ENABLED')),
    };
  }
}
