import { injectable } from 'inversify';

@injectable()
export class TestService {
  constructor() {
    console.log('Initializing TestService');
  }

  test(): void {
    console.log('test message from TestService');
  }
}
