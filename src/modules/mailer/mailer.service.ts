import { LoggerService } from './../logger/logger.service';
import { ConfigService } from './../config/config.service';
import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  // @note: uses lazyloading: do not use directly, instead use getTransporter()
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.logger = this.logger.build(MailerService.name);
  }

  async getTransporter(): Promise<nodemailer.Transporter> {
    if (this.config.node.isEnv('test')) {
      this.transporter = undefined;
    } else if (this.config.mailer.test) {
      this.transporter ||= await this.createTestAccount();
    } else {
      this.transporter ||= await this.createAccount(this.config.mailer.options);
    }
    return this.transporter;
  }

  async createAccount(
    options: nodemailer.TransportOptions,
  ): Promise<nodemailer.Transporter> {
    return nodemailer.createTransport(options);
  }

  async createTestAccount(): Promise<nodemailer.Transporter> {
    this.logger.debug(`Creating mail test account`);
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  async sendMail(options: nodemailer.SendMailOptions) {
    const transporter = await this.getTransporter();
    if (!transporter) {
      this.logger.debug(
        `skip sending mail '${options.from}' to '${options.to}'`,
      );
      return;
    }
    const info = await transporter.sendMail(options);

    this.logger.debug(
      `send mail from '${options.from}' to '${options.to}' got result '${info.response}'`,
    );

    if (this.config.mailer.test) {
      this.logger.debug(
        `sent mail ${info.messageId} ${nodemailer.getTestMessageUrl(info)}`,
      );
    }
  }
}
