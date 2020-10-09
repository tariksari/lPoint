import { Request, Response } from 'express';

import WordRepository from '../_Repository/WordRepository';
import ResponseService from '../_Services/ResponseService';

interface word {
	_id: string;
	type: string;
}

export class ServiceController {
	private WordRepo: WordRepository = new WordRepository();
	public resService: ResponseService = new ResponseService();

	/**
	 * Get Word By Id
	 * @param req
	 * @param res
	 */
	public getWordById(req: Request, res: Response): void {
		this.resService.checkValidation(req, res);

		this.WordRepo.getWordById(req.params.id)
			.then((data) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}

	/**
	 * Get Word
	 * @param req
	 * @param res
	 */
	public getWordByType(req: Request, res: Response): void {
		this.resService.checkValidation(req, res);

		this.WordRepo.getAllWordByType(req.params.wordType)
			.then((data) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}

	/**
	 * Get Word
	 * @param req
	 * @param res
	 */
	public addWord(req: Request, res: Response): void {
		this.resService.checkValidation(req, res);

		this.WordRepo.addWordData(req.body)
			.then((data) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}

	/**
	 * Get Word
	 * @param req
	 * @param res
	 */
	public updateWord(req: Request, res: Response): void {
		this.resService.checkValidation(req, res);

		this.WordRepo.updateWord(req.body)
			.then((data) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}
}
