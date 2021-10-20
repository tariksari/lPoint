import "reflect-metadata";
import { Container } from "inversify";
import TYPES from './types';

import { SqliteClient } from './utils/sqlite/client';
import WordService from './_Services/WordService';
import TurengService from './_Services/TurengService';
import CambridgeService from './_Services/CambridgeService';

const container = new Container();

container.bind<SqliteClient>(TYPES.SqliteClient).to(SqliteClient);
container.bind<WordService>(TYPES.WordService).to(WordService);
container.bind<TurengService>(TYPES.TurengService).to(TurengService);
container.bind<CambridgeService>(TYPES.CambridgeService).to(CambridgeService);

export { container };
