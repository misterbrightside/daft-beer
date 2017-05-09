const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist', 'static'),
    filename: path.join('js', 'bundle.js'),
    publicPath: '/'
  },
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
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: true,
                discardComments: {
                  removeAll: true
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        })
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: 'lodash',
    'react-router-dom': 'react-router-dom'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'BASE_API_URL': JSON.stringify('http://localhost:3000')
    }),
    new ExtractTextPlugin(path.join('css', 'styles.css')),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};