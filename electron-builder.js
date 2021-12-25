/**
* @type {import('electron-builder').Configuration}
* @see https://www.electron.build/configuration/configuration
*/
module.exports = {
    "appId": "com.lpoint.cmu",
    "productName": "LPoint",
    "copyright": "Copyright © year ${author}",
    "mac": {
        "icon": "src/assets/app/logo.png",
        "extendInfo": {
            "LSUIElement": 1
        }
    }
}