import * as CONSTANTS from './constants';

export default {
	[CONSTANTS.WORD_SEARCH_RESPONSE]: (state: any, data: any) => {
		state.data = data;
	},
	[CONSTANTS.WORD_SEARCH_ERROR]: (state: any, err: any) => {
		state.error = err;
	}
};
