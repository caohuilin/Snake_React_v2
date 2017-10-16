const path = require('path');
const conf = require('./gulp.conf');

module.exports = {
  entry: {
    'libs': ['./src/libs.js']
  },
  output: {
    filename: 'libs.min.js',
    path: path.join(process.cwd(), conf.paths.tmp),
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
    ]
  },
}
