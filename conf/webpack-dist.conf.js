const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');
const publicpath = './';
module.exports = {
  module: {
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract(['css', 'less', 'postcss'])
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loaders: [
          'babel',
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
      template: conf.path.src('index.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CopyWebpackPlugin([{context:'app/app.plist', from:'**/*', to:'', toType:'dir'}]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    }),
    new ExtractTextPlugin('index-[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})
  ],
  postcss: () => [autoprefixer],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    publicPath: publicpath,
    filename: '[name]-[hash].js'
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
  entry: {
    app: ['regenerator-runtime/runtime', `./${conf.path.src('index')}`],
    vendor: Object.keys(pkg.dependencies).filter(dep => ['todomvc-app-css'].indexOf(dep) === -1)
  },
  ts: {
    configFileName: 'tsconfig.json'
  },
  tslint: {
    configuration: require('../tslint.json')
  }
};
