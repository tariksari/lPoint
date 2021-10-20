import Axios from '@/_utils/http-client';

import * as CONSTANTS from './constants';
import { types } from '../../types'

export default {
    [CONSTANTS.WORD_REQUEST]: ({ commit }: types, word: string): void => {
        Axios.get('spy/cambridge/' + word)
            .then((resp: any) => {
                commit(CONSTANTS.WORD_RESPONSE, resp);
            })
            .catch((err: any) => {
                commit(CONSTANTS.WORD_REQUEST_ERROR, err.status);
            });
    }
};
