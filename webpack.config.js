var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {

  entry: {
    index: './src/index.js'
  },
  output: {
    path: __dirname + "/dist",
    filename: '[name].js'
  },

  resolve: {
    alias: {
      lib: __dirname + '/src/lib'
    }
  },

  // externals: [{
  //   'svc-action': 'svcAction',
  //   'svc-state': 'svcState',
  //   'svc-storage': 'svcStorage',
  //   'svc-web': 'svcWeb'
  // }],

  plugins: [
    new CopyWebpackPlugin([
      {from: './src/index.html'},
      {from: './node_modules/bootswatch/slate/bootstrap.min.css'},
      {from: './node_modules/bootswatch/fonts/glyphicons-halflings-regular.woff2', to: 'fonts'},
      {from: './node_modules/svc-action/dist/svc-action.min.js'},
      {from: './node_modules/svc-state/dist/svc-state.min.js'},
      {from: './node_modules/svc-storage/dist/svc-storage.min.js'},
      {from: './node_modules/svc-web/dist/svc-web.min.js'},
    ]),
    // new HtmlWebpackPlugin({
    //   hash: true
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=' + __dirname + '/node_modules/babel-preset-es2015'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.html/,
        loader: 'html-loader'
      }
    ]
  }
};

module.exports = config;