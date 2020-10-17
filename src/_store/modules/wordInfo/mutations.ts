import * as CONSTANTS from './constants';

export default {
	[CONSTANTS.WORD_RESPONSE]: (state: any, data: string) => {
		state.data = data;
	},
	[CONSTANTS.WORD_REQUEST_ERROR]: (state: any, err: string) => {
		state.error = err;
	},
};
