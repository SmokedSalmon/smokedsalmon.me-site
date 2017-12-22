var webpack = require("webpack");

module.exports = {
  externals: {
    jquery: "jQuery",
  },
    
  entry: "./public/js/app_main.js",
  output: {
    path: __dirname + "/public/js/",
    filename: "application.js",
    libraryTarget: "window"
  },
  // plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  // ]
}