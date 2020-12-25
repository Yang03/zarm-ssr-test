const path = require('path')
const px2rem = require('postcss-plugin-px2rem');
// const merge = require('webpack-merge')
// const baseConfig = require('./webpack.base')

// const xx = () => {
//   return
// }

const px2remOpts = {
  rootValue: 100
};

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
                   

                    {
                        loader: 'postcss-loader',
                        options: {
                            // parser: 'postcss-strip-inline-comments',
                            plugins: [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-preset-env')({
                                    autoprefixer: {
                                        flexbox: 'no-2009',
                                    },
                                    stage: 3,
                                }),
                                px2rem(px2remOpts)
                            ],
                        },
                    },
                    {loader: "sass-loader"},
                ]


            },
    ],
  }
}

module.exports = config
