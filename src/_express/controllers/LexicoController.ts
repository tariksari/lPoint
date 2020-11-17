import { Request, Response } from 'express';
import LexicoService from '../_Services/LexicoService';

import ResponseService from '../_Services/ResponseService';

interface word {
	_id: string;
	type: string;
}

export class LexicoController {
	private lexService: LexicoService = new LexicoService();
	public resService: ResponseService = new ResponseService();

	/**
	 * Get Word By Id
	 * @param req
	 * @param res
	 */
	public getWordInfo(req: Request, res: Response): void {
		this.resService.checkValidation(req, res);

		this.lexService.getWordInfo(req)
			.then((data) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}
}
