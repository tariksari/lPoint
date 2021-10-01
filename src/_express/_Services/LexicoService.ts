import {Request} from 'express';
import * as cheerio from 'cheerio';

export default class LexicoService {

    /**
     * get Word Info
     * @param req
     */
    public getWordInfo(req: Request) {

    }

    /**
     * parseBody
     * @param body
     */
    protected parseBody(body: Promise<string[]>): Promise<Array<object>> {
        return new Promise(function (resolve,reject) {
            body.then((bodyData: any) => {
                let allWord: Array<object> = [];

                let $ = cheerio.load(bodyData, {
                    normalizeWhitespace: true,
                });

                if (!($(".hwg .hw").first()[0])) {
                    console.log('hataa')
                    return reject();
                }

                var dictionary:any = [],
                    numberOfentryGroup,
                    arrayOfEntryGroup = [],
                    grambs = $("section.gramb"),
                    entryHead = $(".entryHead.primary_homograph");


                let i, j = 0;

                for (i = 0; i < entryHead.length; i++) {
                    arrayOfEntryGroup[i] = $("#" + entryHead[0].attribs.id + " ~ .gramb").length - $("#" + entryHead[i].attribs.id + " ~ .gramb").length;
                }

                arrayOfEntryGroup[i] = $("#" + entryHead[0].attribs.id + " ~ .gramb").length;
    	        numberOfentryGroup = arrayOfEntryGroup.length - 1;

                for (i = 0; i < numberOfentryGroup; i++) {
    
                    var entry:any = {},
                        word = $(".hwg .hw")[i].childNodes[0],
                        phonetic = $(".pronSection.etym .pron .phoneticspelling")[i],
                        pronunciation = $(".pronSection.etym .pron .speaker")[i],
                        origin = $(".pronSection.etym").eq(i).prev().find(".senseInnerWrapper p").text(),
                        audio = $(".speaker audio").attr("src"),
                        spell = $(".phoneticspelling").text(),
                        type = $(".gramb .pos span").eq(0).text();

                    entry.word = word;
                    entry.audio = audio;
                    entry.spell = spell;
                    entry.type = type;

                    if (phonetic) {
                        entry.phonetic = phonetic.childNodes[0] && phonetic.childNodes[0];
                    }
                    if (pronunciation) {
                        entry.pronunciation = $(pronunciation).find("a audio").attr("src");
                    }
            
                    origin && (entry.origin = origin);
            
                    entry.meaning = {};
            
                    let start = arrayOfEntryGroup[i],
                        end = arrayOfEntryGroup[i + 1];
            
                    for (j = start; j < end; j++) {
            
                        var partofspeech = $(grambs[j]).find(".ps.pos .pos").text();
            
                        $(grambs[j]).find(".semb").each(function(j, element) {
            
                            var meaningArray:any = [];
            
                            $(element).find("> li").each(function(j, element) {
            
                                var newDefinition:any = {},
                                    item = $(element).find("> .trg"),
                                    definition = $(item).find(" > p > .ind").text(),
                                    example = $(item).find(" > .exg  > .ex > em").first().text(),
                                    synonymsText = $(item).find(" > .synonyms > .exg  > div").first().text(),
                                    synonyms = synonymsText.split(/,|;/).filter(synonym => synonym != ' ' && synonym).map(function(item) {
                                        return item.trim();
                                    });
            
                                if (definition.length === 0) {
                                    definition = $(item).find(".crossReference").first().text();
                                }
            
                                if (definition.length > 0)
                                    newDefinition.definition = definition;
            
                                if (example.length > 0)
                                    // Remove line break and extra space
                                    newDefinition.example = example.substring(1, example.length - 1).replace(/(\r\n|\n|\r)/gm," ").trim();
            
                                if (synonyms.length > 0)
                                    newDefinition.synonyms = synonyms;
            
                                meaningArray.push(newDefinition);
            
                            });
            
                            if (partofspeech.length === 0)
                                partofspeech = "crossReference";
            
                            entry.meaning[partofspeech] = meaningArray.slice();
                        });
            
                    }
                    dictionary.push(entry);
                }
            
                Object.keys(dictionary).forEach(key => {
                    (Array.isArray(dictionary[key]) && !dictionary[key].length) && delete dictionary[key];
                });
                

                resolve(dictionary);
            });
        });
    }
}
