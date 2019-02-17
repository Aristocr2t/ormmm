import { Application } from 'web-limo';

import { AppModule } from './app/AppModule';

const app = new Application(AppModule, {
  root: './',
  http: {
    hostname: '0.0.0.0',
    port: 1337
  },
  viewsPath: 'views'
});

app.run(({ http }) => {});
