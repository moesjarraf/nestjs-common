import { HttpAuthResultInterface } from './interfaces/auth-result.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class HttpAuthService {
  constructor(private readonly config: ConfigService) {}

  validate(
    token: string,
  ): ReturnType<typeof HttpAuthService.prototype.validateBearer> {
    if (token.match('bearer')) {
      return this.validateBearer(token);
    }

    return { authorized: false };
  }

  validateBearer(token: string): HttpAuthResultInterface {
    if (!this.config.http_auth?.bearer_token) {
      return { authorized: false };
    }

    const bearer = token.split('bearer').pop().trim();
    return { authorized: this.config.http_auth?.bearer_token === bearer };
  }
}
