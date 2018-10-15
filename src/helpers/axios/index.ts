import axios from 'axios'

class axiosHelper {
  get (url: string, params: object) {
    return axios.get(url, params)
  }

  post (url: string, params: object) {
    return axios.post(url, params)
  }

  put (url: string, params: object) {
    return axios.put(url, params)
  }

  delete (url: string, params: object) {
    return axios.delete(url, params)
  }
}

export default axiosHelper