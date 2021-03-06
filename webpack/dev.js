const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const baseConfig = require('./base.js');
const path = require('path');

module.exports = webpackMerge(baseConfig,
  {
    entry: [
      path.resolve(__dirname, '../', 'src', 'index.js'),
    ],
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /style\.css$/,
          use: [
            'style-loader?sourceMap',
            'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            'postcss-loader',
          ],
        },
        {
          test: {
            test: /\.css$/,
            not: [/style\.css$/],
          },
          use: [
            'style-loader?sourceMap',
            'css-loader?importLoaders=1',
            'postcss-loader',
          ],

        },
      ],
    },
    plugins: [
      new DashboardPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  });

