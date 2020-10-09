import Axios from '@/_utils/http-client';

import * as CONSTANTS from './constants';
import {types} from '../../types'

export default {
	[CONSTANTS.AGENDA_GET]: ({ commit, dispatch }:types, wordType:string) => {
		return new Promise((resolve, reject) => {
			commit(CONSTANTS.AGENDA_REQUEST);

			Axios.get('service/word/'+wordType+'/all')
				.then((resp) => {
					console.log(resp);
					commit(CONSTANTS.AGENDA_RESPONSE, resp);
				})
				.catch((err) => {
					console.log(err);
					commit(CONSTANTS.AGENDA_ERROR, err.status);
				});
		});
	},
};
