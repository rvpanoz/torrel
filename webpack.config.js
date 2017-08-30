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
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=[name].[ext]'
    }]
  }
}
