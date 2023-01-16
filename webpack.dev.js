const { merge } = require('webpack-merge');
const main = require('./webpack.common.js');

module.exports = merge(main, {
    mode: 'development',
    devServer: {
        liveReload: true,
        hot: true,
        watchFiles: [
            'src/**/*.html', 
            'src/**/*.css', 
            'src/**/*.js'
        ],
        client: {
            overlay: {
                warnings: false,
                errors: true,
            },
        },
    },
});