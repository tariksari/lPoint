module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
        // defaultLineHeights: true,
        // standardFontWeights: true
    },
    purge: [],
    theme: {
        backgroundColor: theme => ({
            ...theme('colors'),
            'middle-grey': 'rgba(138, 129, 124, 1)',
            'middle-dark': 'rgb(49 49 49)',
            'middle-blue': 'rgb(51 60 76 / 93%)'
        }),
        extend: {}
    },
    variants: {},
    plugins: []
}
