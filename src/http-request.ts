export interface HttpOptions {
  headers?: { [key: string]: string };
  responseType?: ResponseType;
}

export enum ResponseType {
  none = 'none',
  json = 'json'
}

export type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const HttpRequest = {
  DEFAULT_OPTIONS: {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType: ResponseType.json
  } as HttpOptions,
  parseHttpParams(params: { [key: string]: string | number }): string {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(`${params[key]}`)}`)
      .join('&');
  },
  get(requestUrl: string, params?: { [key: string]: string | number }, options?: HttpOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!params) params = {};
      options =
        typeof options === 'object' && options !== null ? { ...HttpRequest.DEFAULT_OPTIONS, ...options } : HttpRequest.DEFAULT_OPTIONS;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', requestUrl + '?' + HttpRequest.parseHttpParams(params), true);
      Object.keys(options.headers).map(key => xhr.setRequestHeader(key, options.headers[key]));
      xhr.send();
      xhr.onerror = function(err: any): void {
        reject(err);
      };
      xhr.onreadystatechange = function(): void {
        if (this.readyState !== 4) return;
        if (options.responseType === ResponseType.json) {
          try {
            resolve(JSON.parse(this.responseText));
          } catch (err) {
            reject(err);
          }
        } else {
          resolve(this.responseText);
        }
      };
    });
  },
  post(requestUrl: string, data?: any, options?: HttpOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!data) data = {};
      options =
        typeof options === 'object' && options !== null ? { ...HttpRequest.DEFAULT_OPTIONS, ...options } : HttpRequest.DEFAULT_OPTIONS;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', requestUrl, true);
      Object.keys(options.headers).map(key => xhr.setRequestHeader(key, options.headers[key]));
      if (options.headers['Content-Type'] && options.headers['Content-Type'].includes('application/json')) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(HttpRequest.parseHttpParams(data));
      }
      xhr.onerror = function(err: any): void {
        reject(err);
      };
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (options.responseType === ResponseType.json) {
          try {
            resolve(JSON.parse(this.responseText));
          } catch (err) {
            reject(err);
          }
        } else {
          resolve(this.responseText);
        }
      };
    });
  },
  put(requestUrl: string, data?: any, options?: HttpOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!data) data = {};
      options =
        typeof options === 'object' && options !== null ? { ...HttpRequest.DEFAULT_OPTIONS, ...options } : HttpRequest.DEFAULT_OPTIONS;
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', requestUrl, true);
      Object.keys(options.headers).map(key => xhr.setRequestHeader(key, options.headers[key]));
      if (options.headers['Content-Type'] && options.headers['Content-Type'].includes('application/json')) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(HttpRequest.parseHttpParams(data));
      }
      xhr.onerror = function(err: any): void {
        reject(err);
      };
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (options.responseType === ResponseType.json) {
          try {
            resolve(JSON.parse(this.responseText));
          } catch (err) {
            reject(err);
          }
        } else {
          resolve(this.responseText);
        }
      };
    });
  },
  delete(requestUrl: string, data?: any, options?: HttpOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!data) data = {};
      options =
        typeof options === 'object' && options !== null ? { ...HttpRequest.DEFAULT_OPTIONS, ...options } : HttpRequest.DEFAULT_OPTIONS;
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', requestUrl, true);
      Object.keys(options.headers).map(key => xhr.setRequestHeader(key, options.headers[key]));
      if (options.headers['Content-Type'] && options.headers['Content-Type'].includes('application/json')) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(HttpRequest.parseHttpParams(data));
      }
      xhr.onerror = function(err: any): void {
        reject(err);
      };
      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (options.responseType === ResponseType.json) {
          try {
            resolve(JSON.parse(this.responseText));
          } catch (err) {
            reject(err);
          }
        } else {
          resolve(this.responseText);
        }
      };
    });
  }
};
