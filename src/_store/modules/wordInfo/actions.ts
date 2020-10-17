import Axios from '@/_utils/http-client';

import * as CONSTANTS from './constants';
import {types} from '../../types'

export default {
	[CONSTANTS.WORD_REQUEST]: ({ commit, dispatch }:types, word:string) => {
			Axios.get('word/' + word)
				.then((resp) => {
					console.log(resp);
					commit(CONSTANTS.WORD_RESPONSE, resp);
				})
				.catch((err) => {
					console.log(err);
					commit(CONSTANTS.WORD_REQUEST_ERROR, err.status);
				});
	},
};
