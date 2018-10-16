// import { AxiosHelper } from '@/typings/interface/AxiosHelper'

interface Json {
  status: number
  data: any[]
  jwt: string
  code: number
  message: string
}

interface AxiosHelper {
  get(url: string, params: object | object[], usingRecursive: boolean): Promise<Json | Json[]>

  post(url: string, params: object | object[], usingRecursive: boolean): Promise<Json | Json[]>

  put(url: string, params: object | object[], usingRecursive: boolean): Promise<Json | Json[]>

  delete(url: string, params: object | object[], usingRecursive: boolean): Promise<Json | Json[]>
}


declare module '@/helpers/Axios/index' {
  const content: AxiosHelper;
  export default content;
}