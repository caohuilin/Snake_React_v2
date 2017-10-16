const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const COMMON_MODULES = eval(fs.readFileSync('./src/libs.js', 'utf8').replace(/require\('[^']*'\)/g, 'true'));
module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'tslint'
      }
    ],

    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(css|less)$/,
        loaders: [
          'style',
          'css',
          'less',
          'postcss'
        ]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
          'ts?transpileOnly=true'
        ]
      },
      {
        test: /\.(ico|png|jpg|gif)$/,
        loaders: ['url-loader?limit=10240&name=images/[name]-[hash:base64:5].[ext]']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: conf.path.src('index.dev.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: () => [autoprefixer],
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js'
  },
  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    `./${conf.path.src('index')}`
  ],
  ts: {
    configFileName: 'tsconfig.json'
  },
  tslint: {
    configuration: require('../tslint.json')
  },
  externals: [
    function (context, request, callback) {
      if (COMMON_MODULES.hasOwnProperty(request)) {
        callback(null, `COMMON_MODULES.require("${request}")`)
      } else {
        // console.log(`module not in COMMON_MODULES: ${request} ${context}`)
        callback()
      }
    }
  ]
};
