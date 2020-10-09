import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { responseCode } from '../_helper/ResponseStatusCode';

export default class ResponseService {
	/**
	 * Response Success
	 * @param data
	 * @param res
	 */
	public successResponse(data: any, res: Response): Response {
		return res.status(responseCode.HTTP_OK).jsonp(data);
	}

	/**
	 * Response Error
	 * @param data
	 * @param res
	 */
	public errorResponse(data: any, res: Response): Response {
		return res.status(responseCode.HTTP_BAD_REQUEST).jsonp(data);
	}

	/**
	 * Validator Error
	 * @param data
	 * @param res
	 */
	public checkValidation(req: Request, res: Response): Response | void {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res
				.status(responseCode.HTTP_UNPROCESSABLE_ENTITY)
				.jsonp(errors.array());
		}
	}
}
