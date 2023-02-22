import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';
import mongoose from 'mongoose';
import delay from 'delay';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly connections: { [key: string]: mongoose.Connection } = {};

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    this.logger = this.logger.build(DatabaseService.name);
  }

  async onModuleDestroy() {
    await this.close();
  }

  async connect(url?: string): Promise<mongoose.Connection> {
    const key = url || this.config.mongo.default_url;

    if (this.connections[key]) {
      return this.connections[key];
    }

    this.logger.debug(`attempting to connect ${key}`);

    try {
      const connection = await mongoose.createConnection(key, {});
      this.connections[key] = connection;
      this.logger.info(`successfully connected ${key}`);
      return connection;
    } catch (e) {
      this.logger.error(`failed to connect '${e}'`);
      await delay(2500);
      return this.connect();
    }
  }

  async close(url?: string): Promise<void> {
    if (url) {
      await this.connections[url].close();
      delete this.connections[url];
      return;
    }

    for (const key in this.connections) {
      if (this.connections.hasOwnProperty(key)) {
        this.logger.info(`closing connection ${key}`);
        await this.connections[key].close();
        delete this.connections[key];
      }
    }
  }
}
