import * as bodyParser from 'body-parser';
import express from 'express';
var cors = require('cors');

import { ApiRoutes } from './routes/api';
import { ServiceRoutes } from './routes/service';

class App {
	public app: express.Application;
	private service_routes: ServiceRoutes = new ServiceRoutes();
	private api_routes: ApiRoutes = new ApiRoutes();

	constructor() {
		this.app = express();
		this.config();
		this.api_routes.route(this.app);
		this.service_routes.route(this.app);
	}

	private config(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(cors());
		this.app.options('*', cors());
	}
}

export default new App().app;
