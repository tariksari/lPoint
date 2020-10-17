import * as CONSTANTS from './constants';

export default {
	[CONSTANTS.UPDATE_LOADER_STATUS]: (state:any,status:any) => {
		state.loader = status;
	}
};
