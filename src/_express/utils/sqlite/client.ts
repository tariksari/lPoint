import { injectable } from 'inversify';
import { SqliteConnnection } from './connection';
import Datastore from 'nedb-promises';

@injectable()
export class SqliteClient {

    public db: Datastore;

    constructor() {
        this.db = SqliteConnnection.getConnection();
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    public async getById(id: string): Promise<string[]> {
        return await this.db.findOne({ _id: id });
    }

    /**
     * 
     * @param wordType 
     * @returns 
     */
    public async getAllByFilter(wordType: string): Promise<any[]> {
        return this.db.find({ type: wordType }).sort({ order: 1 });
    }

    /**
     * 
     * @param data 
     * @returns 
     */
    public async insert(data: any): Promise<any> {
        return await this.db.insert({
            order: 0,
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
     * 
     * @param data 
     * @returns 
     */
    public async update(data: any): Promise<number> {
        return await this.db.update(
            { _id: data.id },
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
            }, { multi: true }
        );
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    public async delete(id: string): Promise<number> {
        return await this.db.remove(
            { _id: id }, {}
        );
    }

    /**
     * 
     * @param id 
     * @param order 
     * @returns 
     */
    public async updateOrder(id: string, order: Number): Promise<number> {
        return await this.db.update(
            { _id: id },
            { $set: { order: order } }, { multi: true }
        );
    }
}