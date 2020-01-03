'use strict'
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')

const mode = 'production'
// const mode = 'development'

module.exports = {
  mode,
  entry: path.join(__dirname, 'src/app.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  devServer: {
    public: 'wikipedia-leaderboard.glitch.me',
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    hot: false,
    inline: true,
  },
  devtool: mode === 'production' ? null : 'eval-source-map',
  watch: mode === 'development',
}
