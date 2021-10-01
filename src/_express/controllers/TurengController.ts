import {
	controller, httpGet, request, response
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { check } from 'express-validator';
import TYPES from '../types';
import * as express from "express";

import TurengService from '../_Services/TurengService';
import ResponseService from '../_Services/ResponseService';

@controller('/api/spy')
export class TurengController {
	constructor(@inject(TYPES.TurengService) private turengService: TurengService) { }

	public resService: ResponseService = new ResponseService();

	@httpGet('/tureng/:word', check('word').not().isEmpty())
	public index(@request() req: any, @response() res: express.Response) {
		this.resService.checkValidation(req, res);
		return this.turengService.getWord(req.params.word);
	}
}
