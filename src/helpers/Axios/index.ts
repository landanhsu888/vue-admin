import axios from 'axios'

class AxiosHelper {
  get (url: string, params: object | Array<object>, isPolling: boolean = false) {
    isPolling = !!isPolling;

    if (params instanceof Array) {
        let paramses = params;
        let resJsons: any[] = [];
        if (isPolling) {
          let nextPromise = function(i) {
              if (i >= paramses.length) {
                  return Promise.resolve(resJsons);
              }
              let params = paramses[i];
              // _reqInit.cache = 'no-cache';
              // _reqInit.mode = 'cors';
              // _reqInit.credentials = 'include';

              return axios.get(url, params).then(function(resJson) {
                  resJsons.push(resJson);
                  return nextPromise(i + 1);
              });
          };
          return nextPromise(0);
        } 

        return Promise.all(paramses.map((params) => {
          return axios.get(url, params)
        }));
    }

    return axios.get(url, params)
  }

  post (url: string, params: object | Array<object>, isPolling: boolean = false): Promise<object> | Promise<object[]> {
    isPolling = !!isPolling;

    if (params instanceof Array) {
        let paramses = params;
        let resJsons: any[] = [];
        if (isPolling) {
          let nextPromise = function(i) {
              if (i >= paramses.length) {
                  return Promise.resolve(resJsons);
              }
              let params = paramses[i];
              // _reqInit.cache = 'no-cache';
              // _reqInit.mode = 'cors';
              // _reqInit.credentials = 'include';

              return axios.post(url, params).then(function(resJson) {
                  resJsons.push(resJson);
                  return nextPromise(i + 1);
              });
          };
          return nextPromise(0);
        } 

        return Promise.all(paramses.map((params) => {
          return axios.post(url, params)
        }));
    }

    return axios.post(url, params)
  }

  put (url: string, params: object | Array<object>, isPolling: boolean = false) {
    isPolling = !!isPolling;

    if (params instanceof Array) {
        let paramses = params;
        let resJsons: any[] = [];
        if (isPolling) {
          let nextPromise = function(i) {
              if (i >= paramses.length) {
                  return Promise.resolve(resJsons);
              }
              let params = paramses[i];
              // _reqInit.cache = 'no-cache';
              // _reqInit.mode = 'cors';
              // _reqInit.credentials = 'include';

              return axios.put(url, params).then(function(resJson) {
                  resJsons.push(resJson);
                  return nextPromise(i + 1);
              });
          };
          return nextPromise(0);
        } 

        return Promise.all(paramses.map((params) => {
          return axios.put(url, params)
        }));
    }

    return axios.put(url, params)
  }

  delete (url: string, params: object | Array<object>, isPolling: boolean = false) {
    isPolling = !!isPolling;

    if (params instanceof Array) {
        let paramses = params;
        let resJsons: any[] = [];
        if (isPolling) {
          let nextPromise = function(i) {
              if (i >= paramses.length) {
                  return Promise.resolve(resJsons);
              }
              let params = paramses[i];
              // _reqInit.cache = 'no-cache';
              // _reqInit.mode = 'cors';
              // _reqInit.credentials = 'include';

              return axios.delete(url, params).then(function(resJson) {
                  resJsons.push(resJson);
                  return nextPromise(i + 1);
              });
          };
          return nextPromise(0);
        } 

        return Promise.all(paramses.map((params) => {
          return axios.delete(url, params)
        }));
    }

    return axios.delete(url, params)
  }
}

export default AxiosHelper