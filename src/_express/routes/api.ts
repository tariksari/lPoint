import { Application, Request, Response } from 'express';

import { ApiController } from '../controllers/ApiController';

export class ApiRoutes {
	private api_controller: ApiController = new ApiController();

	public route(app: Application): void {
		app.get('/api/word/:word', (req: Request, res: Response) => {
			this.api_controller.getWord(req, res);
		});

		app.get('/api/search/:word', (req: Request, res: Response) => {
			this.api_controller.getSearch(req, res);
		});

		app.get('/api/Inflections/:word', (req: Request, res: Response) => {
			this.api_controller.getWordInflection(req, res);
		});

		app.get('/api/sentences/:word', (req: Request, res: Response) => {
			this.api_controller.getSentences(req, res);
		});
	}
}
