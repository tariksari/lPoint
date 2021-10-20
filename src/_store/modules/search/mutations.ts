import * as CONSTANTS from './constants';

export default {
	[CONSTANTS.WORD_SEARCH_RESPONSE]: (state: any, data: any): void => {
		state.data = data;
	},
	[CONSTANTS.WORD_SEARCH_ERROR]: (state: any, err: any): void => {
		state.error = err;
	}
};
