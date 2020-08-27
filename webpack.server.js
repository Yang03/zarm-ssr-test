const path = require('path')
// const merge = require('webpack-merge')
const webpackNodeExternals = require('webpack-node-externals')
// const baseConfig = require('./webpack.base.js')

const config = {
  target: 'node',
  mode: 'production',
  entry: './src/server.js',
  externals: [webpackNodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(scss|css)$/, loader: 'ignore-loader' },
    ],
  },
}

module.exports = config
