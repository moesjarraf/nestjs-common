import { RequestOptions } from './interfaces/request.interface';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RequestService<T = any> {
  constructor(
    private readonly http: HttpService,
    private readonly logger: LoggerService,
  ) {
    this.logger = this.logger.build(RequestService.name);
  }

  async send(config: RequestOptions): Promise<AxiosResponse<T> | AxiosError> {
    const url = config.url;
    const method = config.method;

    const localError = new Error();
    try {
      const response = await lastValueFrom(this.http.request(config as any));
      return response;
    } catch (e) {
      if (config.errorLog !== false) {
        this.log(e, method, url, localError);
      }

      return e;
    }
  }

  async get(
    url: string,
    config: RequestOptions = {},
  ): Promise<AxiosResponse<T> | AxiosError> {
    config.method = 'get';
    config.url = url;
    return await this.send(config);
  }

  async delete(
    url: string,
    config: RequestOptions = {},
  ): Promise<AxiosResponse<T> | AxiosError> {
    config.method = 'delete';
    config.url = url;
    return await this.send(config);
  }

  async head(
    url: string,
    config: RequestOptions = {},
  ): Promise<AxiosResponse<T> | AxiosError> {
    config.method = 'head';
    config.url = url;
    return await this.send(config);
  }

  async post(
    url: string,
    data?: any,
    config: RequestOptions = {},
  ): Promise<AxiosResponse<T> | AxiosError> {
    config.method = 'post';
    config.url = url;
    config.data = data;
    return await this.send(config);
  }

  async put(
    url: string,
    data?: any,
    config: RequestOptions = {},
  ): Promise<AxiosResponse<T> | AxiosError> {
    config.method = 'put';
    config.url = url;
    config.data = data;
    return await this.send(config);
  }

  async patch(
    url: string,
    data?: any,
    config: RequestOptions = {},
  ): Promise<AxiosResponse<T> | AxiosError> {
    config.method = 'patch';
    config.url = url;
    config.data = data;
    return await this.send(config);
  }

  private log(e: AxiosError, method: string, url: string, local: Error) {
    this.logger.error(`failed to send '${method}: ${url}', error: '${e}'`, {
      stack: local.stack,
      response: e.response ? e.response.data : undefined,
    });
  }
}
