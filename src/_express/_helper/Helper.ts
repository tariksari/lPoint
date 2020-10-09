const OX_APP_ID = '20a716c6';
const OX_APP_KEY = 'ae4da0918c402e8e951fcc969a3584eb';
const OX_API_PATH = 'https://od-api.oxforddictionaries.com/api/v2/';

interface Headers {
	app_id: string;
	app_key: string;
}

export interface head extends Headers {
	uri: string;
	headers: Headers;
	json: boolean;
}

export default class Helper {
	/**
	 * Get Request header
	 * @param api
	 * @param word
	 */
	public getRequestHeader(api: string, word: string): head {
		let apiUrl = '';

		switch (api) {
			case 'entries':
				apiUrl =
					OX_API_PATH +
					'entries/en-gb/' +
					word +
					'?fields=pronunciations&strictMatch=false';
				break;
			case 'thesaurus':
				apiUrl = OX_API_PATH + 'search/thesaurus/en?q=' + word;
				break;
			case 'sentences':
				apiUrl =
					OX_API_PATH + 'sentences/en/' + word + '?strictMatch=false';
				break;
			case 'inflections':
				apiUrl =
					OX_API_PATH +
					'inflections/en/' +
					word +
					'?strictMatch=false';
				break;
		}

		return <head>{
			uri: apiUrl,
			headers: {
				app_id: OX_APP_ID,
				app_key: OX_APP_KEY,
			},
			json: true,
		};
	}
}
