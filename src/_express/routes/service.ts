import { Application, Request, Response } from 'express';
import { check } from 'express-validator';

import { ServiceController } from '../controllers/ServiceController';

const WORD_TYPE = ['agenda', 'learned', 'favorite', 'sound'];

export class ServiceRoutes {
	private serController: ServiceController = new ServiceController();

	public route(app: Application): void {

		app.get(
			'/api/service/word/:id',
			check('id').not().isEmpty(),
			(req: Request, res: Response) => {
				this.serController.getWordById(req, res);
			}
		);

		app.get(
			'/api/service/word/:wordType/all',
			check('wordType').not().isEmpty().isIn(WORD_TYPE),
			(req: Request, res: Response) => {
				this.serController.getWordByType(req, res);
			}
		);

		app.post(
			'/api/service/word',
			check('type').not().isEmpty().isIn(WORD_TYPE),
			check('word').not().isEmpty(),
			check('lexical_category').not().isEmpty(),
			check('local_meaning').not().isEmpty(),
			check('audio_uk').not().isEmpty(),
			check('audio_us').not().isEmpty(),
			check('spell').not().isEmpty(),
			check('word_info').not().isEmpty(),
			(req: Request, res: Response) => {
				this.serController.addWord(req, res);
			}
		);

		app.put(
			'/api/service/word',
			check('type').custom((value) => {
				if (typeof value !== 'undefined') {
					if (value.length > 0) {
						if (!WORD_TYPE.includes(value)) {
							return Promise.reject(value + ' Invalid Type');
						}
					}
				}

				return true;
			}),
			check('local_meaning').not().isEmpty(),
			check('lexical_category').not().isEmpty(),
			check('audio_uk').not().isEmpty(),
			check('audio_us').not().isEmpty(),
			check('spell').not().isEmpty(),
			check('word_info').not().isEmpty(),
			(req: Request, res: Response) => {
				this.serController.updateWord(req, res);
			}
		);
	}
}
