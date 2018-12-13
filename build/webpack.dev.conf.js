const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf.js')

const devWebpackConfig = {
    mode: 'development', // 通过 mode 声明开发环境
    output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		filename: './js/[name].bundle.js'
    },
    devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
        publicPath:'/',
        // 将 host 指定为 "0.0.0.0"，就可以通过 IP 地址来访问 Webpack Dev Server 提供的服务了
        host: "0.0.0.0",
        // 是否通过 IP 地址访问服务
        useLocalIp: true,
		port: "8080",
		overlay: true, // 浏览器页面上显示错误
		// open: true, // 自动开启浏览器
		// stats: "errors-only", //stats: "errors-only"表示只打印错误：
        hot: true, // 开启热更新
		//服务器代理配置项
        // proxy: {
        //     '/test/*':{
        //         target: 'https://www.baidu.com',
        //         secure: true,
        //         changeOrigin: true
        //     }
        // },
        // 该配置项主要对控制台的输出进行一些清理工作
        stats:{
            assets: false,
            chunks: false,
            chunkGroups: false,
            chunkModules: false,
            chunkOrigins: false,
            modules: false,
            moduleTrace: false,
            source: false,
            builtAt: false,
            children: false,
            hash:false,
        }
	},
    devtool: "source-map",  // 开启调试模式
    plugins: [
		//热更新
		new webpack.HotModuleReplacementPlugin(),
	],
}

module.exports = merge(baseWebpackConfig, devWebpackConfig);