import { get } from 'request-promise';

import ConfigHelper from '../_helper/Helper';

export default class CambridgeRepository {
	private config: ConfigHelper = new ConfigHelper();

	/**
	 *
	 * @param word
	 */
	public async getWord(word: string): Promise<string[]> {
		return await get(this.config.getCambridgeRequestHeader('word', word));
	}

	/**
	 * 
	 * @param word
	 */
	public async searchWord(word: string): Promise<string[]> {
		return await get(this.config.getCambridgeRequestHeader('search', word));
	}
}