var path = require('path')
var autoprefixer = require('autoprefixer')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		fallback: [path.join(__dirname, '../node_modules')],
		alias: {
			'src': path.resolve(__dirname, '../src'),
			'assets': path.resolve(__dirname, '../src/assets'),
			'components': path.resolve(__dirname, '../src/components')
		}

	},
	resolveLoder: {
		fallback: [path.join(__dirname, '../node_modules')]
	},
	module: {
		preLoaders: [
			{
				test: /\.(vue|js)$/,
				loader: 'eslint',
				include: projectRoot,
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			}, {
				test: /\.js$/,
				loader: 'babel',
				include: projectRoot,
				exclude: /node_modules/
			}
		]
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	vue: {
		loaders: utils.cssLoaders()
	},
	postcss: function() {
		return [autoprefixer]
	}
}
