import Aganda from '../_Models/Word';

interface word {
	type: string;
	lexical_category: string;
	word: string;
	audio: string;
	spell: string;
}

export default class WordRepository {
	private agenda: Aganda = new Aganda();

	/**
	 * Add Word Data
	 * @param data
	 */
	public async getWordById(id: string): Promise<string[]> {
		return await this.agenda.collection().findOne({ _id: id });
	}

	/**
	 * Add Word Data
	 * @param data
	 */
	public async getAllWordByType(wordType: string): Promise<string[]> {
		return await this.agenda.collection().find({ type: wordType });
	}

	/**
	 * Add Word Data
	 * @param data
	 */
	public async addWordData(data: word): Promise<word> {
		return await this.agenda.collection().insert<word>({
			type: data.type,
			lexical_category: data.lexical_category,
			word: data.word,
			audio: data.audio,
			spell: data.spell,
		});
	}

	/**
	 * Add Word Data
	 * @param data
	 */
	public async updateWord(data: word): Promise<number> {
		return await this.agenda.collection().update(
			{ _id: 'DBu2wQLpitq31P19' },
			{
				type: data.type,
				lexical_category: data.lexical_category,
				word: data.word,
				audio: data.audio,
				spell: data.spell,
			}
		);
	}
}
