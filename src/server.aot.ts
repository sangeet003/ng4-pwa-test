/* tslint:disable no-console */
const compression = require('compression');
import 'zone.js/dist/zone-node';
import './polyfills.server';
import './rxjs.imports';
import * as express from 'express';
import * as path from 'path';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModuleNgFactory } from './ngfactory/app/server.app.module.ngfactory';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { routes } from './server.routes';
import { App } from './mock-api/app';
import { enableProdMode } from '@angular/core';
import { UNIVERSAL_PORT } from '../constants';
enableProdMode();
const app = express();
const api = new App();
const baseUrl = `http://localhost:${UNIVERSAL_PORT}`;

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModuleNgFactory
}));

function httpsRedirect(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https' && req.headers['host'].search('localhost') !== 0)
    res.redirect('https://' + req.headers.host + req.url)
  else
    next(); /* Continue to other routes if we're not redirecting */
};

app.set('view engine', 'html');
app.set('views', 'src');

app.use(compression());
app.use(httpsRedirect);
app.use('/', express.static('dist', { index: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: 30 }));
app.use('/service-worker.js', express.static(path.join(__dirname, 'assets/dist_root/service-worker.js'), { maxAge: 30 }));
app.use('/manifest.json', express.static(path.join(__dirname, 'assets/dist_root/manifest.json'), { maxAge: 30 }));

routes.forEach(route => {
  app.get('/' + route, (req, res) => {
    console.time(`GET: ${req.originalUrl}`);
    res.render('../dist/index', {
      req: req,
      res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});

app.get('/data', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.json(api.getData());
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.get('/products', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.json(api.getProducts());
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(UNIVERSAL_PORT, () => {
  console.log(`Listening at ${baseUrl}`);
});
