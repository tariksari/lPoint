import {Application, Request, Response} from 'express';

import {ApiController} from '../controllers/ApiController';
import {TurengController} from '../controllers/TurengController';
import {LexicoController} from '../controllers/LexicoController';
import {CambridgeController} from '../controllers/CambridgeController';

import {check} from 'express-validator';

export class ApiRoutes {
    private api_controller: ApiController = new ApiController();
    private turController: TurengController = new TurengController();
    private lexController: LexicoController = new LexicoController();
    private camController: CambridgeController = new CambridgeController();

    public route(app: Application): void {

        app.get(
            '/api/cam/:word',
            check('word').not().isEmpty(),
            (req: Request, res: Response) => {
                this.camController.getWordInfo(req, res);
            }
        );

        app.get(
            '/api/cam/:word/search',
            check('word').not().isEmpty(),
            (req: Request, res: Response) => {
                this.camController.searchWord(req, res);
            }
        );

        app.get(
            '/api/tureng/:word',
            check('word').not().isEmpty(),
            (req: Request, res: Response) => {
                this.turController.getWordInfo(req, res);
            }
        );

        app.get(
            '/api/lex/:word',
            check('word').not().isEmpty(),
            (req: Request, res: Response) => {
                this.lexController.getWordInfo(req, res);
            }
        );

        app.get('/api/word/:word', (req: Request, res: Response) => {
            this.api_controller.getWord(req, res);
        });

        app.get('/api/search/:word', (req: Request, res: Response) => {
            this.api_controller.getSearch(req, res);
        });

        app.get('/api/Inflections/:word', (req: Request, res: Response) => {
            this.api_controller.getWordInflection(req, res);
        });

        app.get('/api/sentences/:word', (req: Request, res: Response) => {
            this.api_controller.getSentences(req, res);
        });
    }
}
