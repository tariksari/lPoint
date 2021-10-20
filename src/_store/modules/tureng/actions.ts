import Axios from '@/_utils/http-client';
import { types } from '../../types';
import * as CONSTANTS from './constants';

export default {
    [CONSTANTS.WORD_INFO_REQUEST]: ({ commit }: types, word: string): void => {
        Axios.get('spy/tureng/' + word)
            .then((resp: any) => {
                commit(CONSTANTS.WORD_INFO_RESPONSE, resp);
            })
            .catch((err: any) => {
                commit(CONSTANTS.WORD_INFO_ERROR, err.status);
            });
    },
};
