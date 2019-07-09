const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = (env) => {
	console.log(env)
	return merge(common, {
		mode: 'development',
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			port: "6089",
			hot: true,
			historyApiFallback: true
		},
		// devtool: 'cheap-module-eval-source-map',
		module: {
			rules: [
				{ test: /\.(sa|sc)ss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
				{ test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'env': JSON.stringify(env.SELF_ENV_CONFIG)
			})
		]
	})
};
