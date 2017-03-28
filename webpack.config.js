// webpack config
//-----------------------------
//
// Configuración de webpack
// ====================================================

var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: "inline-sourcemap",
  entry: "./js/main.js",
  output: {
    path: __dirname + "/js",
    filename: "bundle.min.js"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
};