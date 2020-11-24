import Axios from '@/_utils/http-client';
import {types} from '../../types';
import * as CONSTANTS from './constants';

export default {
    [CONSTANTS.AGENDA_GET]: ({commit, dispatch}: types, wordType: string) => {
        Axios.get('service/word/' + wordType + '/all')
            .then((resp) => {
                commit(CONSTANTS.AGENDA_RESPONSE, resp);
            })
            .catch((err) => {
                commit(CONSTANTS.AGENDA_ERROR, err.status);
            });
    },
    [CONSTANTS.ADD_AGENDA_WORD_REQUEST]: ({commit, dispatch}: types, formData: object) => {
        commit(CONSTANTS.ADD_WORD_BUTTON_STATUS, true);

        Axios.post('service/word', formData)
            .then((resp) => {
                commit(CONSTANTS.ADD_AGENDA_WORD_RESPONSE, resp);
                setTimeout(() => commit(CONSTANTS.ADD_WORD_BUTTON_STATUS, false), 8000);
            })
            .catch((err) => {
                commit(CONSTANTS.ADD_AGENDA_WORD_ERROR, err.status);
                setTimeout(() => commit(CONSTANTS.ADD_WORD_BUTTON_STATUS, false), 3000);
            });
    },
    [CONSTANTS.UDPATE_AGENDA_WORD_REQUEST]: ({commit, dispatch}: types, formData: object) => {
        Axios.put('service/word', formData)
            .then((resp) => {
                //commit(CONSTANTS.UPDATE_AGENDA_WORD_RESPONSE, resp);
            })
            .catch((err) => {
                commit(CONSTANTS.UPDATE_AGENDA_WORD_ERROR, err.status);
            });
    },
};
