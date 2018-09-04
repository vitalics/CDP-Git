import { Injectable } from 'utils/ioc';
import { Service } from './asbstract.service';
import { User } from 'models';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class UserService extends Service {

  async getAllUsers(): Promise<AxiosResponse<User[]>> {
    return await super.get('/users') as AxiosResponse<User[]>;
  }

  async getUser(userId: number): Promise<AxiosResponse<User>> {
    return await super.get(`/users/${userId}`) as AxiosResponse<User>;
  }
}