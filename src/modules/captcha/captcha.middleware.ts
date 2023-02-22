import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { CaptchaService } from './captcha.service';

@Injectable()
export class CaptchaMiddleware implements NestMiddleware {
  constructor(private readonly captcha: CaptchaService) {}

  use(req: Request, res: Response, next: () => void): any {
    this.captcha
      .validate(req.body.captcha_response)
      .then(({ success }) => {
        (req as any).captchaValid = success;
        next();
      })
      .catch(next);
  }
}
