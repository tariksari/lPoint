import { get } from 'request-promise';

import ConfigHelper from '../_helper/Helper';

export default class ApiRepository {
	private config: ConfigHelper = new ConfigHelper();

	/**
	 *
	 * @param word
	 */
	public async getWord(word: string): Promise<string> {
		return await get(this.config.getOxfordRequestHeader('entries', word));
	}

	/**
	 *
	 * @param word
	 */
	public async getSearchResult(word: string): Promise<string> {
		return await get(this.config.getOxfordRequestHeader('thesaurus', word));
	}
	/**
	 *
	 * @param word
	 */
	public async getAllSentence(word: string): Promise<string> {
		return await get(this.config.getOxfordRequestHeader('sentences', word));
	}

	/**
	 *
	 * @param word
	 */
	public async getAllInflection(word: string): Promise<string> {
		return await get(this.config.getOxfordRequestHeader('inflections', word));
	}
}
