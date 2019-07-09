const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env) => {
	return merge(common, {
		mode: 'production',
		module: {
			rules: [
				{ test: /\.(sa|sc)ss$/, use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'postcss-loader', 'sass-loader'] },
				{ test: /\.css$/, use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'postcss-loader'] },
			]
		},
		plugins: [
			new CleanWebpackPlugin(['dist']),
			new MiniCssExtractPlugin({}),
			new webpack.DefinePlugin({
				'env': JSON.stringify(env.SELF_ENV_CONFIG)
			})
		],
	})
}