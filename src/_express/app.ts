import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from "./inversify.config";
import * as bodyParser from 'body-parser';
import cors from 'cors';

const server = new InversifyExpressServer(container);

import './controllers/ServiceController';
import './controllers/TurengController';
import './controllers/CambridgeController';

server.setConfig((app) => {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cors());
	app.options('*', cors);
});

const app = server.build();

export default app;
