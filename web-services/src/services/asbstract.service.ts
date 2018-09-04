import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class Service {

  public constructor(
    public baseUrl: string = 'https://jsonplaceholder.typicode.com',
    public config: AxiosRequestConfig = { baseURL: baseUrl }
  ) { }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const request = await Axios.get<T>(url, config || this.config);

    return request
  }

  protected async post<T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const request = await Axios.post<T>(url, data, config || this.config);

    return request;
  }
  protected async put<T, U>(url: string, data?: U, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const request = await Axios.put<T>(url, data, config || this.config);

    return request;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const request: AxiosResponse<T> = await Axios.delete(url, config || this.config);

    return request;
  }
}