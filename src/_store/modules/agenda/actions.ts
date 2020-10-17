import Axios from '@/_utils/http-client';

import * as CONSTANTS from './constants';
import {types} from '../../types'

export default {
	[CONSTANTS.AGENDA_GET]: ({ commit, dispatch }:types, wordType:string) => {
			Axios.get('service/word/'+wordType+'/all')
				.then((resp) => {
					commit(CONSTANTS.AGENDA_RESPONSE, resp);
				})
				.catch((err) => {
					console.log(err);
					commit(CONSTANTS.AGENDA_ERROR, err.status);
				});
	},
	[CONSTANTS.ADD_AGENDA_WORD_REQUEST]: ({ commit, dispatch }:types, formData:object) => {
			Axios.post('service/word',formData)
				.then((resp) => {
					commit(CONSTANTS.ADD_AGENDA_WORD_RESPONSE, resp);
				})
				.catch((err) => {
					commit(CONSTANTS.ADD_AGENDA_WORD_ERROR, err.status);
				});
	},
};
