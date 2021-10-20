import { injectable } from 'inversify';
import { get, RequestPromise } from 'request-promise';
import * as cheerio from 'cheerio';

const TURENG_API = 'http://tureng.com/en/turkish-english/';

@injectable()
export default class TurengService {

    /**
     * 
     * @param word 
     * @returns 
     */
    public async getWord(word: string):Promise<Array<unknown>> {
        const respData = get(TURENG_API + encodeURIComponent(word));

        return this.parseBody(respData)
    }

    /**
     * 
     * @param body 
     * @returns 
     */
    private parseBody(body: RequestPromise<any>): Promise<Array<unknown>> {
        return new Promise(function (resolve) {
            body.then((bodyData: any) => {
                const allWord: Array<any> = [];

                const $ = cheerio.load(bodyData, {
                    normalizeWhitespace: true,
                });

                $("#englishResultsTable tr").each(function (i: any, a: any) {
                    const el = $(a);
                    const attrClass = el.attr('class');

                    if (attrClass === undefined && el.attr('style') === undefined) {

                        const category = el.find('td[class="hidden-xs"]').text().trim();
                        const eng = el.find('td[lang="en"]').find('a').text().trim();
                        const tur = el.find('td[lang="tr"]').text().trim();
                        const type = el.find('td[lang="en"]').find('i').text().trim();

                        if (category.length > 0) {
                            allWord.push({
                                category: category,
                                eng: eng,
                                tur: tur,
                                type: type
                            });
                        }
                    }
                });

                resolve(allWord);
            });
        });
    }
}
