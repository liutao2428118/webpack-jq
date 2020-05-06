const { parse } = require('path');
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackConfig = {
    hash: true,
    inject: true
};

module.exports = {
    buildEntriesAndHTML() {
        const entries = {};
        const htmls = [];
        // 用来构建entery
        const result = glob.sync("src/pages/*/index.js");

        console.log(result)
        result.forEach(item => {
            const one = parse(item);
            const name = one.dir.split("/").slice(-1)[0]
            entries[name] = "./" + item;
            htmls.push(
                new HtmlWebpackPlugin({
                    ...HtmlWebpackConfig,
                    filename: `${name}.html`,
                    template: "./" + one.dir + "/index.html",
                    chunks: [name, 'main']
                })
            );
        });
        return {
            entries,
            htmls
        };
    }
}