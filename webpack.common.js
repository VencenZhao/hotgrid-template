const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		filename: '[name].[hash:8].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|ico)$/i, loader: 'url-loader', options: { limit: 10000, outputPath: 'images' } },
			{ test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i, loader: 'url-loader', options: { limit: 10000, outputPath: 'video' } },
			{ test: /(\.jsx?)$/, use: ['babel-loader'], exclude: /(node_modules)/ },
			{ test: /\.json$/, loader: 'json-loader', options: { outputPath: 'json' }, exclude: /(node_modules)/ }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Output Management',
			template: path.resolve(__dirname, './src/index.html'),
			inject: true,
      		favicon: path.resolve(__dirname, './favicon.ico')
		}),
		new webpack.HotModuleReplacementPlugin({}),
		
		new webpack.DefinePlugin({
			"USER": {
				username: JSON.stringify(process.env.NODE_ENV_USER),
				password: JSON.stringify(process.env.NODE_ENV_PWD) 
			}
  		})
	],
	resolve: {
		extensions: [".js", ".json", ".jsx", ".css", ".scss"],
		alias: {
			'&': path.resolve(__dirname, './src'),
		}
	}
};
