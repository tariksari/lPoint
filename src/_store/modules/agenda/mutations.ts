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
		state.error = err;
	},
	[CONSTANTS.UPDATE_AGENDA_WORD_RESPONSE]: (state:any, data:string) => {
		state.data = data;
	},
	[CONSTANTS.UPDATE_AGENDA_WORD_ERROR]: (state:any, err:string) => {
		state.error = err;
	},
	[CONSTANTS.ADD_WORD_BUTTON_STATUS]: (state: any, status: boolean) => {
		state.buttonStatus = status;
	},
};
