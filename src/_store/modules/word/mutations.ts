import * as CONSTANTS from './constants';

export default {
	[CONSTANTS.WORD_RESPONSE]: (state:any, data:string) => {
		state.data = data;
	},
	[CONSTANTS.WORD_ERROR]: (state:any, err:string) => {
		state.data = err;
	},
	[CONSTANTS.ADD_WORD_RESPONSE]: (state:any, data:string) => {
		state.data = data;
	},
	[CONSTANTS.ADD_WORD_ERROR]: (state:any, err:string) => {
		state.error = err;
	},
	[CONSTANTS.UPDATE_WORD_ERROR]: (state:any, err:string) => {
		state.error = err;
	},
	[CONSTANTS.UPDATE_WORD_ORDER_ERROR]: (state:any, err:string) => {
		state.error = err;
	},
	[CONSTANTS.ADD_WORD_BUTTON_STATUS]: (state: any, status: boolean) => {
		state.buttonStatus = status;
	},
	[CONSTANTS.CHANGE_WORD_BUTTON_STATUS]: (state: any, status: boolean) => {
		state.buttonStatus = status;
	},
};
