import Axios from '@/_utils/http-client';
import { types } from '../../types';
import * as CONSTANTS from './constants';

export default {
    [CONSTANTS.WORD_REQUEST]: ({ commit }: types, wordType: string): void => {
        Axios.get('service/word?type=' + wordType + '')
            .then((resp: any) => {
                commit(CONSTANTS.WORD_RESPONSE, resp);
            })
            .catch((err: any) => {
                commit(CONSTANTS.WORD_ERROR, err.status);
            });
    },
    [CONSTANTS.ADD_WORD_REQUEST]: ({ commit }: types, formData: Array<any>): void => {
        commit(CONSTANTS.ADD_WORD_BUTTON_STATUS, true);

        Axios.post('service/word', formData)
            .then((resp: any) => {
                commit(CONSTANTS.ADD_WORD_RESPONSE, resp);
                setTimeout(() => commit(CONSTANTS.ADD_WORD_BUTTON_STATUS, false), 8000);
            })
            .catch((err: any) => {
                commit(CONSTANTS.ADD_WORD_ERROR, err.status);
                setTimeout(() => commit(CONSTANTS.ADD_WORD_BUTTON_STATUS, false), 3000);
            });
    },
    [CONSTANTS.UPDATE_WORD_REQUEST]: ({ commit }: types, formData: Array<any>): void => {
        Axios.put('service/word', formData)
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .then(() => {
            })
            .catch((err: any) => {
                commit(CONSTANTS.UPDATE_WORD_ERROR, err.status);
            });
    },
    [CONSTANTS.UPDATE_WORD_ORDER_REQUEST]: ({ commit }: types, formData: Array<any>): void => {
        Axios.post('service/word/reOrder', formData)
            .then((resp: any) => {
                console.log(resp)
            })
            .catch((err: any) => {
                commit(CONSTANTS.UPDATE_WORD_ORDER_ERROR, err.status);
            });
    },
    [CONSTANTS.DELETE_WORD_REQUEST]: ({ commit }: types, id: string): void => {
        Axios.delete(`service/word/${id}`)
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .then(() => {
            })
            .catch((err: any) => {
                commit(CONSTANTS.DELETE_WORD_ERROR, err.status);
            });
    },
    [CONSTANTS.CHANGE_WORD_BUTTON_STATUS_ACTION]: ({ commit }: types, status: boolean): void => {
        commit(CONSTANTS.CHANGE_WORD_BUTTON_STATUS, status);
    },
};
