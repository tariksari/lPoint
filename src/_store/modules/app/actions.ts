import * as CONSTANTS from './constants';
import { types } from '../../types'

export default {
	[CONSTANTS.ACTION_LOADER_STATUS]: ({ commit }: types, status: boolean): void => {
		commit(CONSTANTS.UPDATE_LOADER_STATUS, status);
	},
};
