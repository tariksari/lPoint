import Axios from '@/_utils/http-client';
import {types} from '../../types';
import * as CONSTANTS from './constants';

export default {
    [CONSTANTS.WORD_REQUEST]: ({commit, dispatch}: types, wordType: string) => {
        Axios.get('service/word/' + wordType + '/all')
            .then((resp) => {
                commit(CONSTANTS.WORD_RESPONSE, resp);
            })
            .catch((err) => {
                commit(CONSTANTS.WORD_ERROR, err.status);
            });
    },
    [CONSTANTS.ADD_WORD_REQUEST]: ({commit, dispatch}: types, formData: object) => {
        commit(CONSTANTS.ADD_WORD_BUTTON_STATUS, true);

        Axios.post('service/word', formData)
            .then((resp) => {
                commit(CONSTANTS.ADD_WORD_RESPONSE, resp);
                setTimeout(() => commit(CONSTANTS.ADD_WORD_BUTTON_STATUS, false), 8000);
            })
            .catch((err) => {
                commit(CONSTANTS.ADD_WORD_ERROR, err.status);
                setTimeout(() => commit(CONSTANTS.ADD_WORD_BUTTON_STATUS, false), 3000);
            });
    },
    [CONSTANTS.UPDATE_WORD_REQUEST]: ({commit, dispatch}: types, formData: object) => {
        Axios.put('service/word', formData)
            .then((resp) => {
            })
            .catch((err) => {
                commit(CONSTANTS.UPDATE_WORD_ERROR, err.status);
            });
    },
    [CONSTANTS.UPDATE_WORD_ORDER_REQUEST]: ({commit, dispatch}: types, formData: object) => {
        Axios.put('service/word/order', formData)
            .then((resp) => {
            })
            .catch((err) => {
                commit(CONSTANTS.UPDATE_WORD_ORDER_ERROR, err.status);
            });
    },
    [CONSTANTS.DELETE_WORD_REQUEST]: ({commit, dispatch}: types, id: string) => {
        Axios.delete(`service/word/${id}`)
            .then((resp) => {
            })
            .catch((err) => {
                console.log(err)
                commit(CONSTANTS.DELETE_WORD_ERROR, err.status);
            });
    },
    [CONSTANTS.CHANGE_WORD_BUTTON_STATUS_ACTION]: ({commit, dispatch}: types, status: boolean) => {
        commit(CONSTANTS.CHANGE_WORD_BUTTON_STATUS, status);
    },
};
