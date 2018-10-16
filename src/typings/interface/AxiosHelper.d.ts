import { Json } from '@/typings/interface/Json'

export declare interface AxiosHelper {
  get(url: string, params: object | object[], usingRecursive: boolean): Promise<Json | Json[]>

  post(url: string, params: object | object[], usingRecursive: boolean): Promise<Json | Json[]>

  put(url: string, params: object | object[], usingRecursive: boolean): Promise<Json | Json[]>

  delete(url: string, params: object | object[], usingRecursive: boolean): Promise<Json | Json[]>
}
