import { HttpOptions, HttpRequest, RequestMethod } from './http-request';
import { Prop } from './prop';

export type ModelMethods = {
  [name: string]: {
    requestHandler: (requestData?: any) => any;
    responseHandler: (responseData?: any) => any;
    requestMethod: RequestMethod;
    options: HttpOptions;
  };
};

const isBlank = (x: any): x is null | undefined => typeof x === 'undefined' || x === null;
const PRIMITIVES = [String, Number, Boolean, Object, Function];
const isModel = (x: any): x is Model => typeof x === 'function' && x.prototype instanceof Model;

export abstract class Model {
  private static methods: ModelMethods = {};
  static async getMethod(name: string, requestUrl: string, requestData?: any): Promise<any> {
    const { requestMethod, options, requestHandler, responseHandler } = this.methods[name];
    return (<any>HttpRequest)[requestMethod](requestUrl, requestHandler(requestData), options).then(responseHandler);
  }

  static setMethod(
    name: string,
    requestMethod: RequestMethod,
    requestHandler: (requestData?: any) => any,
    responseHandler: (responseData?: any) => any,
    options?: HttpOptions
  ): void {
    if (
      typeof name !== 'string' ||
      !['get', 'post', 'put', 'delete'].includes(requestMethod) ||
      !(requestHandler instanceof Function) ||
      !(responseHandler instanceof Function)
    ) {
      throw new Error('Incorrect parameters');
    }
    this.methods[name] = { requestHandler, responseHandler, requestMethod, options };
  }

  protected replace?(item: any): void {
    if (isBlank(item)) return;
    const props = this.constructor[Prop.$props] || {};
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const options = props[key];
        const self = this,
          value = item[key];
        const type = options.type as any;
        if (PRIMITIVES.includes(type)) {
          if (!isBlank(value)) {
            self[key] = type(value);
          }
        } else if (type instanceof Function) {
          if (isModel(type)) {
            self[key] = new (<any>type)(value);
          } else {
            self[key] = type(value);
            if (isModel(self[key])) {
              self[key] = new (<any>self[key])(value);
            }
          }
        }
        if (!options.allowNull && self[key] === null) {
          throw new Error(`Null value of "${key}" property is denied`);
        }
      }
    }
  }
}

export function ArrayModel<T>(type: any, allowNull: boolean = true): (value?: any) => T[] {
  return (value?: any) => {
    type = isModel(type) ? type : type();
    return Array.from(value || []).map(x => {
      if (PRIMITIVES.includes(type)) {
        if (!isBlank(value)) {
          return type(x);
        } else if (!allowNull) {
          throw new Error(`Null value of array element is denied`);
        }
        return x;
      } else if (isModel(type)) {
        return new (<any>type)(x);
      }
      return x;
    });
  };
}
