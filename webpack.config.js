"use strict";
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = {
  mode: "development",
  contentBase: path.join(__dirname, "src/app.js"),

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  devServer: {
    public: "curiosity-charts.glitch.me",
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/dist/"
  },
  watch: true
};

// module.exports = {
//   entry: './src/main.js',
//   resolve: {
//     alias: {
//       'vue$': 'vue/dist/vue.esm.js'
//     }
//   },
//   devServer: {
//     contentBase: path.join(__dirname, "dist"),
//     compress: true,
//     port: 9000,
//     public: "vue.glitch.me:9000",
//     publicPath: "/dist/",
//     inline: true
//   },
//   watch: true,
//   module: {
//     rules: [{
//       test: /\.vue$/,
//       loader: 'vue-loader'
//     },
//     {
//       test: /\.css$/,
//       loader:'css-loader'
//     }]
//   },

//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist')
//   }
// };
