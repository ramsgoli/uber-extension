const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/App.js',
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

    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TOKEN': JSON.stringify(process.env.TOKEN)
    })
  ]
}
