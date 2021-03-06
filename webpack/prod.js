const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./base.js');

const analizer = new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  reportFilename: 'report.html',
  openAnalyzer: false,
});
const cssModules = new ExtractTextPlugin({
  filename: 'app.css',
  allChunks: true,
});
const globalCss = new ExtractTextPlugin({
  filename: 'global.css',
  allChunks: true,
});

module.exports = webpackMerge(baseConfig,
  {
    entry:
    './src/index.js',

    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /style\.css$/,
          use: cssModules.extract({
            use: [
              'css-loader?modules&importLoaders=1&localIdentName=[local]',
              'postcss-loader',
            ],
          }),
        },
        {
          test: {
            test: /\.css$/,
            not: [/style\.css$/],
          },
          use: globalCss.extract({
            use: [
              'css-loader?importLoaders=1',
              'postcss-loader',
            ],
          }),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),

      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
        sourceMap: true,
      }),
      cssModules,
      globalCss,
      analizer,
    ],
  });
