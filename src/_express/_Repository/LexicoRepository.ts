import { get } from 'request-promise';

import ConfigHelper from '../_helper/Helper';

export default class LexicoRepository {
	private config: ConfigHelper = new ConfigHelper();

	/**
	 *
	 * @param word
	 */
	public async getWord(word: string): Promise<string[]> {
		return await get(this.config.getLexicoRequestHeader(word));
	}
}
