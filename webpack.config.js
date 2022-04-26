const path = require("path");
// const webpack = require("webpack");

const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.js/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      // 页面title 需要搭配 ejs 使用
      title: "reactProject",
      // html 模板路径
      template: "./public/index.html",
      // 输出文件名称
      filename: "index.html",
      minify: {
        // 压缩HTML⽂件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true, // 压缩内联css
      },
    }),
    // 每次部署时清空 dist 目录
    new CleanWebpackPlugin(),
  ],
  devServer: {
    // 指向打包后的文件地址
    // contentBase: "./dist",
    // 是否自动打开一个新窗口
    // open: true,
    // 端口号
    port: 8088,
    // 是否开启热更新
    // hot: true,
    // 启用热模块替换，而不会在构建失败时将页面刷新作为后备。
    // hotOnly: true,
  },
};
