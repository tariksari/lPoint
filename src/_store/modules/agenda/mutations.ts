import * as CONSTANTS from './constants';

export default {
	[CONSTANTS.AGENDA_RESPONSE]: (state:any, data:string) => {
		state.data = data;
	},
	[CONSTANTS.AGENDA_ERROR]: (state:any, err:string) => {
		state.data = err;
	},
	[CONSTANTS.ADD_AGENDA_WORD_RESPONSE]: (state:any, data:string) => {
		state.data = data;
	},
	[CONSTANTS.ADD_AGENDA_WORD_ERROR]: (state:any, err:string) => {
		state.data = err;
	},
};
