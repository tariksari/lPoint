import * as CONSTANTS from './constants';

export default {
    [CONSTANTS.WORD_INFO_RESPONSE]: (state: any, data: string) => {
        state.data = data;
    },
    [CONSTANTS.WORD_INFO_ERROR]: (state: any, err: string) => {
        state.data = err;
    },
};
