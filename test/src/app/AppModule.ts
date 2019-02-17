import { inject } from 'inversify';
import { Module } from 'web-limo';

import { TestController } from './controllers/TestController';
import { TestService } from './TestService';

@Module({
  path: '/',
  controllers: [TestController],
  dependencies: [TestService],
  routes: [
    {
      path: '*',
      handlers: [
        (req, res) => {
          res.json({ status: 404, statusText: 'Not found' });
        }
      ]
    }
  ]
})
export class AppModule {
  constructor(@inject(TestService) test: TestService) {
    test.test();
  }
}
