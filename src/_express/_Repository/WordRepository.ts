import Aganda from '../_Models/Word';

interface word {
    type: string;
    lexical_category: string;
    word: string;
    local_meaning: string;
    audio_uk: string;
    audio_us: string;
    spell: string;
    word_info: object
}

export default class WordRepository {
    private agenda: Aganda = new Aganda();

    /**
     * Add Word Data
     * @param data
     */
    public async getWordById(id: string): Promise<string[]> {
        return await this.agenda.collection().findOne({_id: id});
    }

    /**
     * Add Word Data
     * @param data
     */
    public async getAllWordByType(wordType: string): Promise<string[]> {
        return await this.agenda.collection().find({type: wordType});
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
    public async updateWord(data: word): Promise<number> {
        return await this.agenda.collection().update(
            {_id: 'DBu2wQLpitq31P19'},
            {
                type: data.type,
                lexical_category: data.lexical_category,
                word: data.word,
                local_meaning: data.local_meaning,
                audio_uk: data.audio_uk,
                audio_us: data.audio_us,
                spell: data.spell,
                word_info: data.word_info
            }
        );
    }
}
