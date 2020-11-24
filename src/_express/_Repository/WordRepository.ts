import Word from '../_Models/Word';

interface WordInfo {
    id?: string,
    order?: Number
    type: string;
    lexical_category: string;
    word: string;
    local_meaning: string;
    audio_uk: string;
    audio_us: string;
    spell: string;
    word_info: object;
}

export default class WordRepository {
    private word: Word = new Word();

    /**
     * Add Word Data
     * @param id
     */
    public async getWordById(id: string): Promise<string[]> {
        return await this.word.collection().findOne({_id: id});
    }

    /**
     * Add Word Data
     * @param wordType
     */
    public async getAllWordByType(wordType: string): Promise<string[]> {
        return this.word.collection().find({type: wordType});
    }

    /**
     * Add Word Data
     * @param data
     */
    public async addWordData(data: WordInfo): Promise<WordInfo> {
        return await this.word.collection().insert<WordInfo>({
            type: data.type,
            lexical_category: data.lexical_category,
            word: data.word,
            local_meaning: data.local_meaning,
            audio_uk: data.audio_uk,
            audio_us: data.audio_us,
            spell: data.spell,
            word_info: data.word_info
        });
    }

    /**
     * Add Word Data
     * @param data
     */
    public async updateWord(data: WordInfo): Promise<number> {
        return await this.word.collection().update(
            {_id: data.id},
            {
                $set: {
                    type: data.type,
                    lexical_category: data.lexical_category,
                    word: data.word,
                    local_meaning: data.local_meaning,
                    audio_uk: data.audio_uk,
                    audio_us: data.audio_us,
                    spell: data.spell,
                    word_info: data.word_info
                }
            }, {multi: true}
        );
    }

    /**
     * Update Order Word
     * @param id
     * @param order
     */
    public async updateWordOrder(id: string, order: Number): Promise<number> {
        return await this.word.collection().update(
            {_id: id},
            {$set: {order: order}}, {multi: true}
        );
    }
}
