import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from "./inversify.config";
import * as bodyParser from 'body-parser';
const cors = require('cors');

let server = new InversifyExpressServer(container);

import './controllers/ServiceController';
import './controllers/TurengController';
import './controllers/CambridgeController';

server.setConfig((app) => {
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cors());
	app.options('*', cors());
});

let app = server.build();

export default app;
