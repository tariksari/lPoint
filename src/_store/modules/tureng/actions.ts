import Axios from '@/_utils/http-client';
import {types} from '../../types';
import * as CONSTANTS from './constants';

export default {
    [CONSTANTS.WORD_INFO_REQUEST]: ({commit, dispatch}: types, word: string) => {
        Axios.get('tureng/' + word)
            .then((resp) => {
                commit(CONSTANTS.WORD_INFO_RESPONSE, resp);
            })
            .catch((err) => {
                commit(CONSTANTS.WORD_INFO_ERROR, err.status);
            });
    },
};
