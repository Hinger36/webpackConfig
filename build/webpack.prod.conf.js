const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const prodWebpackConfig = {
    mode: 'production', // 通过mode声明生产环境
    output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		filename: 'js/[name].[hash].js',
		publicPath: './'
	},
	plugins: [
		//删除dist目录
		new cleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../'), //根目录
			verbose: true, //开启在控制台输出信息
			dry: false,
		}),
		// 分离css插件参数为提取出去的路径
		new MiniCssExtractPlugin({
            filename: "css/[name].[hash:8].min.css",
            chunkFilename: "[id].css"
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false,
					drop_debugger: false,
					drop_console: true
				}
			},
			exclude: /\.min\.js$/,
			parallel: true, // 开启并行压缩，充分利用cpu
		}),
		//压缩css
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true,
				autoprefixer: { disable: true }
			}
		}),
		new BundleAnalyzerPlugin()
	]
}



module.exports = merge(baseWebpackConfig, prodWebpackConfig)