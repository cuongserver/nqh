//@ts-check
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { VueLoaderPlugin } from "vue-loader";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
// @ts-ignore
import BuildHashPlugin from "build-hash-webpack-plugin";

/**
 * @typedef {import("webpack").Configuration} Configuration
 */

const vueFileRegex = /\.vue$/i;
const tsFileRegex = /\.(ts|tsx)$/i;
const sassFileRegex = /\.s[ac]ss$/i;
const fontFileRegex = /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/i;
const inlineBase64UrlRegex = /^data:image\/.*$/i;
const extForLaterRemoval = "forLaterRemoval";

const __dirname = path.resolve();

//vue entrypoints here
/**
 * @type {Configuration["entry"]}
 */
const vueEntryPoints = {
  "app1-pkg": "./entry-points/entry-app1.ts",
};

/**
 * @param {{[key: string]: string}} _env
 * @returns {Configuration}
 */
const config = (_env) => {
  const isDevMode = !!process.env.USE_DEV_MODE;
  return {
    entry: { ...vueEntryPoints },
    mode: isDevMode ? "development" : "production",
    devtool: isDevMode ? false : "source-map",
    output: {
      filename: `[name]${isDevMode ? "" : ".[fullhash]"}.js`,
      path: path.resolve(__dirname, process.env.OUTPUT_PATH ?? "dist"),
      clean: true,
      publicPath: process.env.PUBLIC_PATH ?? "/",
      globalObject: "globalThis",
      chunkFilename: `chunks/[name]${isDevMode ? "" : ".[fullhash]"}.js`,
      assetModuleFilename: (path, _info) => {
        const isFontFile = fontFileRegex.test(path.filename ?? "");
        return `${isFontFile ? "fonts/" : "others/"}[name][ext]`;
      },
    },
    resolve: {
      alias: {
        "@scripts": path.resolve(__dirname, "src", "scripts"),
        "@assets": path.resolve(__dirname, "src", "assets"),
        "@styles": path.resolve(__dirname, "src", "styles"),
      },
      extensions: [".ts", ".vue"],
    },
    module: {
      rules: [
        {
          test: vueFileRegex,
          loader: "vue-loader",
        },
        {
          test: tsFileRegex,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [vueFileRegex],
              transpileOnly: true, //https://laracasts.com/discuss/channels/elixir/wabpack-cli-error-on-reload-watch
              compilerOptions: {
                noImplicitAny: false, // Necessary until the following issue is fixed: https://github.com/vuejs/vue-loader/issues/1915
              },
            },
          },
        },
        {
          test: sassFileRegex,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: process.env.PUBLIC_PATH ?? "../",
              },
            },
            {
              loader: "css-loader",
              options: {
                url: {
                  filter:
                    /**
                     * @param {string} url
                     * @param {string} _resourcePath
                     */
                    (url, _resourcePath) => {
                      return !inlineBase64UrlRegex.test(url);
                    },
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["postcss-preset-env"]],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                additionalData: `
                    @import "@styles/common.scss";
                  `,
              },
            },
          ],
        },
        {
          exclude: [tsFileRegex, sassFileRegex, vueFileRegex, /node_modules/],
          type: "asset/resource",
        },
      ],
    },
    optimization: {
      minimize: isDevMode ? false : true,
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            name: "vendors",
          },
        },
      },
    },
    plugins: [
      new VueLoaderPlugin(),
      new WebpackManifestPlugin({}),
      {
        /**
         * @param {import("webpack").Compiler} compiler
         */
        apply: (compiler) => {
          compiler.hooks.thisCompilation.tap(
            "RemoveJsGeneratedByCssBuild",
            (compilation, _) => {
              compilation.hooks.processAssets.tap(
                "RemoveJsGeneratedByCssBuild",
                (assets) => {
                  Object.keys(assets).forEach((key) => {
                    if (key.endsWith(extForLaterRemoval))
                      compilation.deleteAsset(key);
                  });
                }
              );
            }
          );
        },
      },
      new BuildHashPlugin(),
      new MiniCssExtractPlugin({
        filename: `styles/[name]${isDevMode ? "" : ".[fullhash]"}.css`,
      }),
    ],
  };
};

export default config;
