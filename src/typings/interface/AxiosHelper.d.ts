interface AxiosHelper {
  get(url: string, params: object | object[], isPolling?: boolean): Promise<Json | Json[]>

  post(url: string, params: object | object[], isPolling?: boolean): Promise<Json | Json[]>

  put(url: string, params: object | object[], isPolling?: boolean): Promise<Json | Json[]>

  delete(url: string, params: object | object[], isPolling?: boolean): Promise<Json | Json[]>
}
