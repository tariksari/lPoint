import {Request} from 'express';
import TurengRepository from '../_Repository/TurengRepository';
import * as cheerio from 'cheerio';

export default class TurengService {
    private repTureng: TurengRepository = new TurengRepository();

    /**
     * get Word Info
     * @param req
     */
    public getTurengWordInfo(req: Request) {
        let wordInfoBody = this.repTureng.getWordInfo(req.params.word);

        return this.parseBody(wordInfoBody)
    }

    /**
     * parseBody
     * @param body
     */
    protected parseBody(body: Promise<string[]>): Promise<Array<object>> {
        return new Promise(function (resolve) {
            body.then((bodyData: any) => {
                let allWord: Array<object> = [];

                let $ = cheerio.load(bodyData, {
                    normalizeWhitespace: true,
                });

                $("#englishResultsTable tr").each(function (i: any, a: any) {
                    let el = $(a);
                    let attrClass = el.attr('class');

                    if (attrClass === undefined && el.attr('style') === undefined) {

                        let category = el.find('td[class="hidden-xs"]').text().trim();
                        let eng = el.find('td[lang="en"]').find('a').text().trim();
                        let tur = el.find('td[lang="tr"]').text().trim();
                        let type = el.find('td[lang="en"]').find('i').text().trim();

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
