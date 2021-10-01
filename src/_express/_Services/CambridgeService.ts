import { injectable } from 'inversify';
import { get, RequestPromise } from 'request-promise';

import * as cheerio from 'cheerio';

const CAMBRIFGE_API = 'https://dictionary.cambridge.org/dictionary/english/';

@injectable()
export default class CambridgeService {

    /**
     * 
     * @param word 
     * @returns 
     */
    public async getWordDetail(word: string) {
        let responseBody = get(CAMBRIFGE_API + word);

        return this.parseBody(responseBody)
    }

    /**
     * 
     * @param word 
     * @returns 
     */
    public async getAutocompleteResult(word: string) {
        return get("https://dictionary.cambridge.org/autocomplete/amp?dataset=english&q=" + word + "&__amp_source_origin=https%3A%2F%2Fdictionary.cambridge.org");
    }

    /**
     * 
     * @param body 
     * @returns 
     */
    protected parseBody(body: RequestPromise<string[]>): Promise<Array<object>> {
        return new Promise(function (resolve) {
            body.then((bodyData: any) => {
                let $ = cheerio.load(bodyData, {
                    normalizeWhitespace: true,
                });

                let word = $(".headword .hw").first().text()

                if (word.length > 0) {
                    let type = $(".pos.dpos").first().text(),
                        phoneticSpelling = $(".ipa.dipa").first().text(),
                        TurkishMeaning = $(".trans.dtrans.dtrans-se").eq(0).text().trim(),
                        audioUk = "https://dictionary.cambridge.org" + $("#ampaudio1").children().eq(1).attr("src"),
                        audioUs = "https://dictionary.cambridge.org" + $("#ampaudio2").children().eq(1).attr("src"),
                        wordDataEl = $(".irreg-infls").find(".inf-group"),
                        wordInfo: any = []

                    if (wordDataEl.children().length > 0) {
                        wordDataEl.each(function (j, element) {
                            let meaning = $(element).find(".lab.dlab").text();
                            let action = $(element).find(".inf.dinf").text();

                            wordInfo.push({ meaning: meaning, action: action });
                        })
                    }

                    let attributes = [{
                        word: word,
                        type: type,
                        phonetic_spelling: phoneticSpelling,
                        local_meaning: TurkishMeaning,
                        audio_uk: audioUk,
                        audio_us: audioUs,
                        word_info: wordInfo
                    }];

                    resolve(attributes);

                } else {
                    resolve([{}]);
                }
            });
        });
    }
}
