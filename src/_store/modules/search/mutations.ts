import * as CONSTANTS from './constants';

export default {
	[CONSTANTS.WORD_SEARCH_RESPONSE]: (state: any, data: string) => {
		state.data = JSON.parse(data);
	}
};
