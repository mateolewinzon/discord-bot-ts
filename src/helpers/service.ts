import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
export class Service {
  private instance: AxiosInstance;

  constructor(baseURL: string, defaultConfig: AxiosRequestConfig) {
    this.instance = axios.create({ baseURL, ...defaultConfig });
  }

  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, config);
    return response.data;
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(
      url,
      data,
      config
    );
    return response.data;
  }
}
