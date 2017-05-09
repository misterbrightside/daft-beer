const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, 'src', 'server.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server-bundle.js',
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  target: 'node',
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'es2015'],
            plugins: [
              require('babel-plugin-transform-class-properties'),
              require('babel-plugin-transform-object-rest-spread')
            ]
          }
        }
      }, 
      {
        test: /\.scss$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin(path.join('static', 'css', 'styles.css')),
  ]
  };