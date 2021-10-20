import * as CONSTANTS from './constants';

export default {
    [CONSTANTS.WORD_RESPONSE]: (state: any, data: any): void => {
        state.data = data;
    },
    [CONSTANTS.WORD_REQUEST_ERROR]: (state: any, err: string): void => {
        state.error = err;
    }
};
