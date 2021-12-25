/**
* @type {import('electron-builder').Configuration}
* @see https://www.electron.build/configuration/configuration
*/
module.exports = {
    "appId": "com.myproject.cmu",
    "productName": "LPoint",
    "copyright": "Copyright © year ${author}",
    "mac": {
        "extendInfo": {
            "LSUIElement": 1
        }
    }
}