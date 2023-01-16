const { merge } = require('webpack-merge');
const main = require('./webpack.common.js');

module.exports = merge(main, {
    mode: 'production',
    module: {},
});