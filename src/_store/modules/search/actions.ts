import Axios from '@/_utils/http-client';

import * as CONSTANTS from './constants';
import { types } from '../../types'

export default {
	[CONSTANTS.WORD_SEARCH_GET]: ({ commit }: types, word: string): void => {
		Axios.get('spy/cambridge/' + encodeURI(word) + '/autocomplete')
			.then((resp: any) => {
				commit(CONSTANTS.WORD_SEARCH_RESPONSE, resp);
			})
			.catch((err: any) => {
				commit(CONSTANTS.WORD_SEARCH_ERROR, err.status);
			});
	},
};
