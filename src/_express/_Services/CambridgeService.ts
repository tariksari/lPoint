import {Request} from 'express';
import * as cheerio from 'cheerio';
import CambridgeRepository from '../_Repository/CambridgeRepository';
import {SolderingIron} from 'mdue';

export default class LexicoService {
    private repCam: CambridgeRepository = new CambridgeRepository();

    /**
     * get Word Info
     * @param req
     */
    public getWordInfo(req: Request) {
        let wordInfoBody = this.repCam.getWord(req.params.word);

        return this.parseBody(wordInfoBody)
    }

    /**
     * Search Word
     * @param req 
     */
    public searhWord(req:Request){
        return this.repCam.searchWord(req.params.word);
    }

    /**
     * parseBody
     * @param body
     */
    protected parseBody(body: Promise<string[]>): Promise<Array<object>> {
        return new Promise(function (resolve) {
            body.then((bodyData: any) => {
                let $ = cheerio.load(bodyData, {
                    normalizeWhitespace: true,
                });

                let word = $(".tw-bw.dhw.dpos-h_hw.di-title").text()

                if (word.length > 0) {
                    let type = $(".pos.dpos").text(),
                        phoneticSpelling = $(".ipa.dipa").text(),
                        TurkishMeaning = $(".trans.dtrans.dtrans-se").eq(0).text().replace(/\s/g, ''),
                        audioUk = "https://dictionary.cambridge.org" + $("#ampaudio1").children().eq(1).attr("src"),
                        audioUs = "https://dictionary.cambridge.org" + $("#ampaudio2").children().eq(1).attr("src"),
                        wordDataEl = $(".irreg-infls.hdib.dinfls").find(".inf-group.dinfg"),
                        wordInfo: any = []

                    if (wordDataEl.children().length > 0) {
                        wordDataEl.each(function (j, element) {
                            let meaning = $(element).find(".lab.dlab").text();
                            let action = $(element).find(".inf.dinf").text();

                            wordInfo.push({meaning: meaning, action: action});
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
