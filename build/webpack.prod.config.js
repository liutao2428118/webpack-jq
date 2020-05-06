const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽取样式到单独文件的插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css的插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // js压缩插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清空打包目录的插件
const merge = require('webpack-merge');
const base = require('./webpack.base.config')

module.exports = merge(base, {
    mode: 'production', // 配置当前环境
    module: {
        rules: [{
            test: /\.styl$/,
            use: [
                MiniCssExtractPlugin.loader, // 抽离样式
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true // sourceMap找到样式的出处
                    }
                },
                {
                    loader: 'stylus-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, // 抽离样式
                {
                    loader: 'css-loader'
                }],
        },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            dry: false, // 模拟删除
            verbose: true, // 写入日志
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist")]
        }), // 清空打包目录
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', // 设置最终输出的文件名
            chunkFilename: '[id].css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true, // 消除注释
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});
