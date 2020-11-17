import { Request, Response } from 'express';
import CambridgeService from '../_Services/CambridgeService';

import ResponseService from '../_Services/ResponseService';

interface word {
	_id: string;
	type: string;
}

export class CambridgeController {
	private camService: CambridgeService = new CambridgeService();
	public resService: ResponseService = new ResponseService();

	/**
	 * Get Word By Id
	 * @param req
	 * @param res
	 */
	public getWordInfo(req: Request, res: Response): void {
		this.resService.checkValidation(req, res);

		this.camService.getWordInfo(req)
			.then((data) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}

	/**
	 * Get Word By Id
	 * @param req
	 * @param res
	 */
	public searchWord(req: Request, res: Response): void {
		this.resService.checkValidation(req, res);

		this.camService.searhWord(req)
			.then((data) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}
}
