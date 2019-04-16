const webpack = require('webpack');
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	entry: {
		'index': './src/index/index.js',
		'samples': './src/samples/index.js',
		'sample': './src/sample/index.js',
		'check': './src/check/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'www'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: { sourceMap: true } },
					{
						loader: 'sass-loader',
						options: {
							outputStyle: 'compressed',
							sourceMap: true,
							includePaths: ['node_modules']
						}
					},
					{
						loader: 'postcss-loader',
						options: {
			        ident: 'postcss',
			        plugins: [
			          require('autoprefixer')({
									browsers: ['last 2 versions'],
									cascade: false
								}),
			        ]
			      }
					}
				]
			}
		]
	},
	// mode: 'production',
	mode: 'development',
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name].css' }),
	]
}
