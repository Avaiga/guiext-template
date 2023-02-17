/*
 * Copyright 2022 Avaiga Private Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

// webpack should be in the node_modules directory, install if not.
const path = require("path");
const webpack = require("webpack");
require("dotenv").config();

module.exports = (env, options) => {
  const TAIPY_GUI_DIR = process.env.TAIPY_GUI_DIR;

  return {
    mode: options.mode, // 'development' | 'production'
    entry: ["./src/index.ts"],
    output: {
      filename: "library.js",
      path: path.resolve(__dirname, "dist"),
      library: {
        name: "Library",
        type: "umd",
      },
      publicPath: "/",
    },
    // The Taipy GUI library is indicated as external so that it is
    // excluded from bundling.
    externals: { "taipy-gui": "TaipyGui" },

    // Enable sourcemaps for debugging webpack's output.
    devtool: options.mode === "development" && "inline-source-map",
    // Increase the performance budget
    performance: {
      hints: false,
      maxAssetSize: 350000,
      maxEntrypointSize: 350000,
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },

    plugins: [
      new webpack.DllReferencePlugin({
        manifest: path.resolve(
          __dirname,
          `${TAIPY_GUI_DIR}/taipy/gui/webapp/taipy-gui-deps-manifest.json`
        ),
        name: "TaipyGuiDependencies",
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  };
};
