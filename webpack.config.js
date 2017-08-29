const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'app.js',
    publicPath: 'dist'
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: [{
        loader: 'file-loader'
      }]
    }]
  }
}
