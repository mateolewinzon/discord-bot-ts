import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

const options: AxiosRequestConfig = {
  method: "GET",
  url: "https://openai80.p.rapidapi.com/models",
  headers: {
    "X-RapidAPI-Key": "67f51fba44mshbc88c263c30ce3ap123141jsn80f25ba615d9",
    "X-RapidAPI-Host": "openai80.p.rapidapi.com",
  },
};

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
