const OX_APP_ID = '20a716c6';
const OX_APP_KEY = 'ae4da0918c402e8e951fcc969a3584eb';
const OX_API_PATH = 'https://od-api.oxforddictionaries.com/api/v2/';
const LEXICO_API = 'https://www.lexico.com/definition/';
const CAMBRIFGE_API = 'https://dictionary.cambridge.org/dictionary/english/';

interface Headers {
    app_id: string;
    app_key: string;
    'User-Agent': string;
}

export interface head extends Headers {
    uri: string;
    headers: Headers;
    json: boolean;
}

export default class Helper {
    /**
     * Get Request header
     * @param api
     * @param word
     */
    public getOxfordRequestHeader(api: string, word: string): head {
        let apiUrl = '';

        switch (api) {
            case 'entries':
                apiUrl =
                    OX_API_PATH +
                    'entries/en-gb/' +
                    word +
                    '?fields=pronunciations&strictMatch=false';
                break;
            case 'thesaurus':
                apiUrl = OX_API_PATH + 'search/thesaurus/en?q=' + word;
                break;
            case 'sentences':
                apiUrl =
                    OX_API_PATH + 'sentences/en/' + word + '?strictMatch=false';
                break;
            case 'inflections':
                apiUrl =
                    OX_API_PATH +
                    'inflections/en/' +
                    word +
                    '?strictMatch=false';
                break;
        }

        return <head>{
            uri: apiUrl,
            headers: {
                app_id: OX_APP_ID,
                app_key: OX_APP_KEY,
            },
            json: true,
        };
    }

    /**
     *
     * @param word
     */
    public getLexicoRequestHeader(word: string): head {
        return <head>{
            uri: LEXICO_API + word,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
            }
        };
    }

    /**
     *
     * @param api
     * @param word
     */
    public getCambridgeRequestHeader(api: string, word: string): head {

        let apiUrl = '';

        switch (api) {
            case 'word':
                apiUrl = CAMBRIFGE_API + word;
                break;
            case 'search':
                apiUrl = 'https://dictionary.cambridge.org/autocomplete/amp?dataset=english&q=' + word + '&__amp_source_origin=https%3A%2F%2Fdictionary.cambridge.org';
                break;
        }

        return <head>{
            uri: apiUrl,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
            }
        };
    }
}
