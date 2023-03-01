/*
 * Copyright 2023 Avaiga Private Limited
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

const webpack = require("webpack");
const path = require("path");
require("dotenv").config();

module.exports = (_env, options) => {
  return {
    mode: options.mode, // "development" | "production"
    entry: ["./src/index.ts"],
    output: {
      // filename: the filename of the JavaScript bundle that gets generated.
      // The 'get_scripts()' method of the ElementLibrary subclass must return
      // the full path to this file.
      filename: "library.js",
      path: path.resolve(__dirname, "dist"),
      library: {
        // name: if ElementLibrary.get_js_module_name() is not overloaded (which
        // is the case in the template), this must be a camel case version of the
        // extension library name (the string returned by its 'get_name()' method).
        // In this template, because get_name() returns "library", we
        // must use the string "Library" with a capital 'L'.
        // See the ElementLibrary.get_js_module_name() documentation for details.
        name: "Library",
        type: "umd"
      },
      publicPath: "/",
    },
    // The Taipy GUI library is indicated as external so that it is
    // excluded from bundling.
    externals: {"taipy-gui": "TaipyGui"},

    // Enable sourcemaps for debugging webpack's output.
    devtool: options.mode === "development" && "inline-source-map",
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
          `${process.env.TAIPY_GUI_DIR}/taipy/gui/webapp/taipy-gui-deps-manifest.json`
        ),
        name: "TaipyGuiDependencies"
      }),
    ]
  };
};
