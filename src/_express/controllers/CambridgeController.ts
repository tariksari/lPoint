import {
	controller, httpGet,request, response
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { check } from 'express-validator';
import TYPES from '../types';
import * as express from "express";

import CambridgeService from '../_Services/CambridgeService';
import ResponseService from '../_Services/ResponseService';


@controller('/api/spy')
export class CambridgeController {
	constructor(@inject(TYPES.CambridgeService) private cambridgeService: CambridgeService) { }

	public resService: ResponseService = new ResponseService();

	@httpGet('/cambridge/:word', check('word').isString())
	public detail(@request() req: any, @response() res: express.Response) {
		this.resService.checkValidation(req, res);
		return this.cambridgeService.getWordDetail(req.params.word);
	}

	@httpGet('/cambridge/:word/autocomplete', check('word').isString())
	public search(@request() req: any, @response() res: express.Response) {
		this.resService.checkValidation(req, res);
		return this.cambridgeService.getAutocompleteResult(req.params.word);
	}
}
