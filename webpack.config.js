const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    main: ['./src/App.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'popup.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TOKEN': JSON.stringify(process.env.TOKEN)
    }),
    new ExtractTextPlugin('dist/popup.css')
  ]
}
