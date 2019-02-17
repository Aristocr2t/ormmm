import * as cors from 'cors';
import { inject } from 'inversify';
import { action, Controller, Request, Response } from 'web-limo';

import { TestService } from '../TestService';

@Controller({
  onResponse: (response, path) => {
    console.log(response, path);
  },
  onRequest: ({ body, params }, path) => {
    console.log(body, params, path);
  },
  onError: (err, action, controller) => {
    return {
      status: err.code || 500,
      statusText: err.message || err,
      details: {
        ...err,
        action,
        controller
      }
    };
  },
  handlers: [
    cors({
      origin: true,
      methods: ['POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type']
    })
  ]
})
export class TestController {
  constructor(private test: TestService) {}

  @action({ path: 'test/:id', method: 'post' })
  async testAction({ body }: Request): Promise<Response> {
    return {
      status: 200,
      statusText: 'OK'
    };
  }
}
