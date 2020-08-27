const path = require('path')
// const merge = require('webpack-merge')
// const baseConfig = require('./webpack.base')

// const xx = () => {
//   return
// }

const config = {
  mode: 'development',
  entry: './src/client/client.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      },
      {
                test: /\.(css|scss)$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-preset-env')({
                                    autoprefixer: {
                                        flexbox: 'no-2009',
                                    },
                                    stage: 3,
                                }),
                            ],
                        },
                    },
                ]


            },
    ],
  }
}

module.exports = config
