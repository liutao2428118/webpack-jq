const { resolve } = require('path');
const webpack = require('webpack')
const build = require('./build.config')
const r = path => resolve(__dirname, path)

const builde = build.buildEntriesAndHTML()

let plugins = [
    new webpack.ProvidePlugin({ //加载jq
        $: 'jquery'
    })
]


module.exports = {
    entry: {
        main: r('../src/main.js'),
        ...builde.entries
    }, //入口文件
    output: { // 输出
        filename: 'js/[name].js',
        path: r('../dist')
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {
            layuicss: r('../src/lib/layui-v2.5.6/layui/css/layui.css'),
            layercss: r('../src/lib/layui-v2.5.6/layui/css/modules/layer/default/layer.css'),
            laydatecss: r('../src/lib/layui-v2.5.6/layui/css/modules/laydate/default/laydate.css'),
            layuialljs: r('../src/lib/layui-v2.5.6/layui/layui.all.js')
        }
    },
    externals: {

    },
    devtool: 'inline-source-map', // 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules|lib/, // 加快编译速度，不包含node_modules文件夹内容
            use: [{
                loader: 'babel-loader', // babel-loader版本不一样会出现很多坑，如果以后遇到报错，首先对照下以前项目的版本
                options: {
                    cacheDirectory: true // cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时
                }
            },
            { loader: r("./inject-loader.js") }// 开发模式使用注入代码实现html热更新}
            ]
        },
        {
            test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
            use: [{
                loader: 'url-loader', // 根据图片大小，把图片优化成base64
                options: {
                    limit: 10000 // 图片小于10k就转成base64
                }
            }]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/, // 处理字体图标
            use: [
                {
                    loader: 'file-loader', // 根据图片大小，把图片优化成base64
                    options: {
                        publicPath: "fonts/",
                        outputPath: "fonts/"
                    }
                }

            ]
        }

        ]
    },
    plugins: plugins.concat(builde.htmls)
}