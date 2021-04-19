"use strict";
const path = require("path");
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const vantConfig = path.join(__dirname, "./src/styles/vantConfig.less");
const defaultSettings = require("./src/settings.js");
const Compression = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "LAISITECH"; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 8080; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.NODE_ENV === "production" ?
    "/h5/h5V2/weekPlan" : "/h5/h5V2/weekPlan",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 50,
            propList: ["*"],
          }),
        ],
      },
      less: {
        modifyVars: {
          hack: `true; @import "${vantConfig}";`,
        },
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        // lessOptions: {
        //   modifyVars: {
        //     // 直接覆盖变量
        //     red: '#1989fa',
        //     blue: '#ee0a24',
        //     orange: '#f08d49',
        //     white:"#000",
        //     'text-color': '#111',
        //     'active-color': '#B4E7A0',
        //     // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
        //      hack: `true; @import "${vantConfig}";`,
        //   },
        // },
      },
    },
  },
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    
  },
  configureWebpack: config => {
    let baseConfig={
      name: name,
        resolve: {
          alias: {
            "@": resolve("src"),
            "@u": resolve("src/utils"),
            "@a": resolve("src/api"),
            "@s": resolve("src/style"),
          },
        },
    }

    if (process.env.NODE_ENV != "dev") {
      baseConfig.plugins=[
        new Compression({
          test: /\.js$|\.html$|\.css$/, // 选择压缩的 文件格式
          threshold: 10240, //超过10k启动gzip压缩
          deleteOriginalAssets: false //删除源文件
        })
      ]
      return baseConfig
    }else{
      return baseConfig
    }

  },
  chainWebpack(config) {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config.when(process.env.NODE_ENV === "development", (config) =>
      config.devtool("cheap-source-map")
    );

    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [{
          // `runtime` must same as runtimeChunk name. default is `runtime`
          inline: /runtime\..*\.js$/,
        }, ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk("single");
    });
  },
};