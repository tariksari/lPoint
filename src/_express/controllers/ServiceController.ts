import {
	controller, httpGet, httpPost, httpPut, httpDelete, request, response
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { check } from 'express-validator';
import TYPES from '../types';
import * as express from "express";

import WordService from '../_Services/WordService';
import ResponseService from '../_Services/ResponseService';

const WORD_TYPES = ['agenda', 'learned', 'favorite', 'sound'];

@controller('/api/service')
export class ServiceController {
	constructor(@inject(TYPES.WordService) private wordService: WordService) { }
	public resService: ResponseService = new ResponseService();

	@httpGet('/word', check('type').not().isEmpty().isIn(WORD_TYPES))
	public index(@request() req: any, @response() res: express.Response) {
		this.resService.checkValidation(req, res);
		return this.wordService.getAllWordByType(req.query.type);
	}

	@httpGet('/word/:id', check('id').not().isEmpty())
	public async show(@request() req: any, @response() res: express.Response) {
		this.resService.checkValidation(req, res);

		try {
			const word = await this.wordService.getWordById(req.params.id);
			return this.resService.successResponse(word, res);
		} catch (err) {
			this.resService.errorResponse(err, res);
		}
	}

	@httpPost('/word',
		check('type').not().isEmpty().isIn(WORD_TYPES),
		check('word').not().isEmpty(),
		check('lexical_category').not().isEmpty(),
		check('local_meaning').isEmpty(),
		check('audio_uk').not().isEmpty(),
		check('audio_us').not().isEmpty(),
		check('spell').not().isEmpty(),
	)
	public async store(@request() req: express.Request, @response() res: express.Response) {
		this.resService.checkValidation(req, res);

		try {
			const word = await this.wordService.addWord(req.body);

			return this.resService.successResponse(word, res);
		} catch (err) {
			this.resService.errorResponse(err, res);
		}
	}

	@httpPost('/word/reOrder',
		check('id').not().isEmpty(),
		check('order').not().isEmpty(),
		check('list_type').not().isEmpty().isIn(WORD_TYPES),
	)
	public async reOrder(@request() req: express.Request, @response() res: express.Response) {
		this.resService.checkValidation(req, res);
		await this.wordService.reOrder(req.body);
		return this.resService.noContentResponse(null, res);
	}

	@httpPut('/word',
		check('id').not().isEmpty(),
		check('type').custom((value) => {
			if (typeof value !== 'undefined') {
				if (value.length > 0) {
					if (!WORD_TYPES.includes(value)) {
						return Promise.reject(value + ' Invalid Type');
					}
				}
			}

			return true;
		})
	)
	public async update(@request() req: express.Request, @response() res: express.Response) {
		this.resService.checkValidation(req, res);

		await this.wordService.updateWord(req.body);
		res.sendStatus(200);
	}

	@httpDelete('/word/:id', check('id').not().isEmpty(),)
	public async destroy(@request() req: any, @response() res: express.Response) {
		this.resService.checkValidation(req, res);

		if (await this.wordService.deleteWord(req.params.id)) {
			return this.resService.noContentResponse(null, res);

		}

		this.resService.errorResponse(null, res);
	}
}
