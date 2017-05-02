const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('css/[name].css');//
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // entry: './src/js/index.js',
  entry: {
    main: __dirname + './src/js/index.js',
    vendor: ['jquery'] //'[]'表示引入标准包
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  //在下面进行配置 webpack-dev-server
  devServer: {
    contentBase: "./",
    historyApiFallback: true,
    inline: true
  },
  module: {
    rules: [
      {test: /\.json$/, use: 'json-loader'},
      {
        test: /\.css$/, 
        use: extractCSS.extract({
          use: 'css-loader!style-loader'
        })
      },
      {
        test: /\.png|.jpg|.jpeg$/, 
        use: "file-loader?limit-5000&name-/dist/images/[hash:8].name.[ext]"
      }
    ]
      
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),//webpack内置压缩
    // new UglifyJSPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'Custom template',
    //   filename: '../views/index-auto.html',
    //   template: __dirname + '/views/index.html',
    //   inject: 'body'
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({ //提供公共代码
      name: 'vendor',
      filename: 'lib/jquery.min.js'
    }),
    new webpack.HotModuleReplacementPlugin(),
    extractCSS  //css抽取
  ]
};

