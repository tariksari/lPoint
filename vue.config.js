module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "extraResources": [
          {
            "from": "./src/assets/app",
            "to": "src/assets/app",
            "filter": [
              "**/*"
            ]
          }
        ]
      },
    }
  },
}