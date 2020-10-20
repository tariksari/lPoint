import { get } from 'request-promise';

const TURENG_API ='http://tureng.com/en/turkish-english/';

export default class TurengRepository {

	/**
	 * Add Word Data
	 * @param data
	 */
	public async getWordInfo(word: string): Promise<string[]> {
		return await get(TURENG_API+ encodeURIComponent(word));
	}
}
