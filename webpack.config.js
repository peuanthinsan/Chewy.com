const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
  name: 'client',
  target: 'web',
  context: __dirname,
  entry: {
  	'main': ['./src/app/index.jsx', 'webpack-hot-middleware/client'],
  },
  output: {
  	path: path.join(__dirname + '/dist'),
  	filename: 'client.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src/app',
      'node_modules'
    ]
  },
  module: {
  	rules: [
  	  {
  	  	test: /\.(js|jsx)$/,
  	  	exclude: [
  	  	  /node_modules/,
  	  	  /entrypoint\.server\.js$/,
  	  	],
  	  	use: [
  	  	  {
  	        loader: 'babel-loader',
  	        options: {
  	          presets: ['react', 'es2015'],
  	        },
  	  	  },
  	  	],
  	  },
  	  {
  	  	test: /\.(css|scss)$/,
  	  	exclude: /node_modules/,
  	  	use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
  	        {
			        loader: 'postcss-loader',
			        options: {
			          sourceMap: true,
		          },
		        },
            {
			        loader: 'sass-loader',
			        options: {
			          sourceMap: true,
			        },
		        },
          ]
        }),
  	  },
      {
        test: /\.(svg|png|jpg|gif|mp4)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
  	]
  },
  devServer: {
  	contentBase: path.join(__dirname, "dist"),
  	compress: true,
  	port: 8080,
  	stats: {
  	  colors: true,
  	},
  },
  plugins: [
  	new HtmlWebpackPlugin({
  	  template: 'src/index.html',
  	}),
    new ExtractTextPlugin("style.css"),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
},
];