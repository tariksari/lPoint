
import { inject, injectable } from 'inversify';
import { SqliteClient } from '../utils/sqlite/client';
import TYPES from '../types';

@injectable()
export default class WordService {
    private sqliteClient: SqliteClient;

    constructor(
        @inject(TYPES.SqliteClient) sqliteClient: SqliteClient
    ) {
        this.sqliteClient = sqliteClient;
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    public async getWordById(id: string): Promise<any[]> {
        return await this.sqliteClient.getById(id);
    }

    /**
     * 
     * @param wordType 
     * @returns 
     */
    public async getAllWordByType(wordType: string): Promise<any[]> {
        return this.sqliteClient.getAllByFilter(wordType);
    }

    /**
     * 
     * @param data 
     * @returns 
     */
    public async updateWord(data: any): Promise<number> {
        return await this.sqliteClient.update(data);
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    public async deleteWord(id: string): Promise<number> {
        return await this.sqliteClient.delete(id);
    }

    /**
     * 
     * @param id 
     * @param order 
     * @returns 
     */
    public async updateWordOrder(id: string, order: Number): Promise<number> {
        return await this.sqliteClient.updateOrder(id, order);
    }

    /**
    * 
    * @param data 
    * @returns 
    */
    public async reOrder(body: any): Promise<any> {
        await this.sorter(body.list_type, body);
    }

    /**
     * 
     * @param req 
     * @returns 
     */
    public async addWord(req: any): Promise<any> {

        await this.sorter(req.type);

        return await this.sqliteClient.insert(req);
    }

    /**
     * 
     * @param req 
     */
    private async sorter(wordType: any, customItem: any = null) {
        let words: any[][] = [];
        let isCustomItemUpdated = false;

        await this.sqliteClient.getAllByFilter(wordType).then(function (word) {
            words.push(word)
        })

        let i = customItem ? 0 : 1;
        for await (const item of words[0]) {
            if (customItem) {
                if (item._id == customItem.id) {
                    continue
                }
                if (customItem && customItem.order == i) {
                    await this.sqliteClient.updateOrder(customItem.id, customItem.order);

                    isCustomItemUpdated = true
                }
            }

            await this.sqliteClient.updateOrder(item._id, isCustomItemUpdated ? i + 1 : i);

            i++
        }
    }
}
