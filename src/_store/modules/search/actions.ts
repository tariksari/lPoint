import Axios from '@/_utils/http-client';

import * as CONSTANTS from './constants';
import {types} from '../../types'

export default {
	[CONSTANTS.WORD_SEARCH_GET]: ({ commit, dispatch }:types, word:string) => {
		return new Promise((resolve, reject) => {
			commit(CONSTANTS.WORD_SEARCH_REQUEST);

			Axios.get('search/' + word)
				.then((resp) => {
					console.log(resp);
					commit(CONSTANTS.WORD_SEARCH_RESPONSE, resp);
				})
				.catch((err) => {
					console.log(err);
					commit(CONSTANTS.WORD_SEARCH_ERROR, err.status);
				});
		});
	},
};
