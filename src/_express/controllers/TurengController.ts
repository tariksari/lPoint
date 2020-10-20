import { Request, Response } from 'express';

import ResponseService from '../_Services/ResponseService';
import TurengService from '../_Services/TurengService';

interface word {
	_id: string;
	type: string;
}

export class TurengController {
	private turService: TurengService = new TurengService();
	public resService: ResponseService = new ResponseService();

	/**
	 * Get Word By Id
	 * @param req
	 * @param res
	 */
	public getWordInfo(req: Request, res: Response): void {
		this.resService.checkValidation(req, res);

		this.turService.getTurengWordInfo(req)
			.then((data) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}
}
