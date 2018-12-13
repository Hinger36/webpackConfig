const path = require('path')
const glob = require('glob')
// html模板
const htmlWebpackPlugin = require('html-webpack-plugin')
//静态资源输出
const copyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const devMode = process.env.NODE_ENV === 'development'

// 获取html-webpack-plugin参数的方法
const getHtmlConfig = function (name, chunks) {
	return {
		template: `./src/pages/${name}/index.html`,
		filename: `${name}.html`,
		// favicon: './favicon.ico',
		// title: title,
		inject: true,
		hash: true, //开启hash  ?[hash]
		chunks: chunks,
		minify: devMode ? false : {
			removeComments: true, //移除HTML中的注释
			collapseWhitespace: true, //折叠空白区域 也就是压缩代码
			removeAttributeQuotes: true, //去除属性引用
		},
	}
}

function getEntry() {
    const entry = {};
    glob.sync('./src/pages/*/*.js')
        .forEach(function (name) {
            var start = name.indexOf('src/') + 4,
                end = name.length - 3
            var eArr = []
            var n = name.slice(start, end)
            n = n.slice(0, n.lastIndexOf('/')) //保存各个组件的入口 
            n = n.split('/')[1]
            eArr.push(name)
            entry[n] = eArr
        });
    return entry
}

module.exports = {
    entry: getEntry(),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    //将外部变量或者模块加载进来
	externals: {
        // 'jquery': 'window.jQuery'
	},
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    devMode
                        ? 'style-loader' 
                        : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                        }
                    },
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|\.min\.js$)/,  // (不处理node_modules 和 bower_components下的js文件) 优化处理加快速度
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                // 需要下载file-loader和url-loader
                loader: 'url-loader',
                options: {
                    limit: 10000,   // 小于这个时将会已base64位图片打包处理
                    outputPath: 'img'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'media'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: 'fonts'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            }
        ]
    },
    // 提取公共代码
    optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {   // 抽离第三方插件
					test: /node_modules/,   // 指定是node_modules下的第三方包
					chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名   
                    minSize: 30000,
                    minChunks: 1, 
					// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
					priority: 10    
				},
                utils: { // 抽离自己写的公共代码，common这个名字可以随意起
					chunks: 'initial',
					name: 'common',  // 任意命名
					minSize: 0,    // 只要超出0字节就生成一个新包
					minChunks: 2
                }
			}
		}
    },
    plugins: [
        //静态资源输出
		new copyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: './static',
			ignore: ['.*']
        }]),
    ]
}

//配置页面
const entryObj = getEntry();
const htmlArray = [];
Object.keys(entryObj).forEach(element => {
	htmlArray.push({
		_html: element,
		title: '',
		chunks: ['vendor', 'common', element]
	})
})

//自动生成html模板
htmlArray.forEach((element) => {
	module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})