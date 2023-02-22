import { AxiosRequestConfig } from 'axios';

export interface RequestOptions extends AxiosRequestConfig {
  errorLog?: boolean;
}
