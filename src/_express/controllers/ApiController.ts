import { Request, Response } from 'express';

import ApiRepository from '../_Repository/ApiRepository';
import ResponseService from '../_Services/ResponseService';

export class ApiController {
	private api_repository: ApiRepository = new ApiRepository();
	public resService: ResponseService = new ResponseService();

	/**
	 * Get Word
	 * @param req
	 * @param res
	 */
	public getWord(req: Request, res: Response): void {
		this.api_repository
			.getWord(req.params.word)
			.then((data: string) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}

	/**
	 * Search Word
	 * @param req
	 * @param res
	 */
	public getSearch(req: Request, res: Response): void {
		this.api_repository
			.getSearchResult(req.params.word)
			.then((data: string) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}

	/**
	 * Get Sentences
	 * @param req
	 * @param res
	 */
	public getSentences(req: Request, res: Response): void {
		this.api_repository
			.getAllSentence(req.params.word)
			.then((data: string) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}

	/**
	 * Get Inflection
	 * @param req
	 * @param res
	 */
	public getWordInflection(req: Request, res: Response): void {
		this.api_repository
			.getAllInflection(req.params.word)
			.then((data: string) => {
				this.resService.successResponse(data, res);
			})
			.catch((err) => {
				this.resService.errorResponse(err, res);
			});
	}
}
