import path from "path"

import { CleanWebpackPlugin } from "clean-webpack-plugin"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import TerserWebpackPlugin from "terser-webpack-plugin"
import type webpack from "webpack"
import type { Configuration } from "webpack-dev-server"

const isProduction = process.env.NODE_ENV === "production"

const commonPlugins: webpack.WebpackPluginInstance[] = [
  new HtmlWebpackPlugin({
    template: "./template/index.html",
    favicon: "./template/favicon.ico",
  }),
  new ForkTsCheckerWebpackPlugin(),
]

const plugins: webpack.WebpackPluginInstance[] = isProduction
  ? [...commonPlugins, new CleanWebpackPlugin(), new MiniCssExtractPlugin()]
  : [...commonPlugins]

const devServer: Configuration = {
  static: {
    directory: path.resolve(__dirname, "/dist"),
  },
  historyApiFallback: true,
  open: true,
  port: 8000,
  hot: true,
  proxy: {
    "/api": "http://localhost:8080",
    "/thumbnails": "http://localhost:8080",
    "/images": "http://localhost:8080",
  },
}

const config: webpack.Configuration = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.tsx",
  devtool: isProduction ? false : "inline-source-map",

  output: {
    publicPath: "/",
    path: path.resolve(__dirname + "/dist"),
    filename: "[name].bundle.js",
    assetModuleFilename: "assets/[hash].[ext]",
  },

  plugins: plugins,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                jsx: isProduction ? "react-jsx" : "react-jsxdev",
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              prettier: false,
              svgo: isProduction,
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: { overrides: { removeViewBox: false } },
                  },
                ],
              },
              titleProp: true,
              ref: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"],
  },

  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: "LICENSE.txt",
          banner: false,
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: { name: "vendor" },
  },

  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },

  devServer: devServer,
}

export default config
