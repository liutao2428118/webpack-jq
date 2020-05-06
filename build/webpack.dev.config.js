const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = merge(base, {
    mode: 'development', // 配置当前环境
    devServer: {
        clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
        hot: true, // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
        // contentBase: path.join(__dirname, "../dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
        compress: true, // 一切服务都启用gzip 压缩
        host: '127.0.0.1', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
        port: 3000, // 端口
        open: false, // 是否打开浏览器
        overlay: { // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
            warnings: true,
            errors: true
        },
        publicPath: '/', // 此路径下的打包文件可在浏览器中访问。

    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader'
                    }],
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader', // 抽离样式
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
                test: /\.(htm|html)$/,
                // use: [ raw-loader配合inject-loader.js实现html热重载
                //     'raw-loader'  raw-loader与html-loader产生冲突，所以raw-loade定义到inject-loader.js里面了
                // ]
            }
        ]
    }
})