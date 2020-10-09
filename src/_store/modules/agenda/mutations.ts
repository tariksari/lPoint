import * as CONSTANTS from './constants';

export default {
	[CONSTANTS.AGENDA_REQUEST]: (state:any) => {
		//state.theme.dark_mode = !state.theme.dark_mode;
	},
	[CONSTANTS.AGENDA_RESPONSE]: (state:any, data:string) => {
		state.data = data;
	},
	[CONSTANTS.AGENDA_ERROR]: (state:any, data:string) => {
		console.log(data);
	},
};
