import * as CONSTANTS from './constants';

export default {
	[CONSTANTS.WORD_REQUEST]: (state:any) => {
		//state.theme.dark_mode = !state.theme.dark_mode;
	},
	[CONSTANTS.WORD_RESPONSE]: (state:any, data:string) => {
		state.data = data;
	},
	[CONSTANTS.WORD_REQUEST_ERROR]: (state:any, data:string) => {
		console.log(data);
	},
};
