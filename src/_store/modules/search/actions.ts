import Axios from '@/_utils/http-client';

import * as CONSTANTS from './constants';
import {types} from '../../types'

export default {
	[CONSTANTS.WORD_SEARCH_GET]: ({ commit, dispatch }:types, word:string) => {
			Axios.get('cam/'+word+'/search')
				.then((resp) => {
					commit(CONSTANTS.WORD_SEARCH_RESPONSE, resp);
				})
				.catch((err) => {
					commit(CONSTANTS.WORD_SEARCH_ERROR, err.status);
				});
	},
};
