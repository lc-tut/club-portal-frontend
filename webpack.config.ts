import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import TerserWebpackPlugin from 'terser-webpack-plugin'

const isProduction = process.env.NODE_ENV === 'production'

const commonPlugins: webpack.WebpackPluginInstance[] = [
  new HtmlWebpackPlugin({
    template: './template/index.html',
  }),
  new ForkTsCheckerWebpackPlugin(),
]

const plugins: webpack.WebpackPluginInstance[] = isProduction
  ? [...commonPlugins, new CleanWebpackPlugin()]
  : [...commonPlugins]

const config: webpack.Configuration = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  devtool: isProduction ? false : 'inline-source-map',

  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'index.js',
    assetModuleFilename: 'assets/[hash][ext]',
  },

  plugins: plugins,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                jsx: isProduction ? 'react-jsx' : 'react-jsxdev',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: 'LICENSE.txt',
          banner: false,
        },
      }),
    ],
  },

  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
}

export default config
