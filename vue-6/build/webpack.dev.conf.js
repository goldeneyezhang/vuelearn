'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
//张一博加
var express=require('express')
var router=express.Router();
var mockData=require('../src/fixture/items.json')
var _=require('lodash')

const app = express()
const apiRoutes = express.Router()
app.use('/api', apiRoutes)
//到这里结束
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
  before(app) {
    app.get('/api/someApi', (req, res) => {
      console.log(req)
      res.json({
        // 这里是你的json内容
        custom:'response'
      })
    })
    .get('/api/books',function(req,res){
      //查询图书数据
      console.log(req.query)
      var page=req.query.pageIndex-1||0,
      size=req.query.pageSize||10,
      filter=req.query.filter,
      skipStart=(page>0?page-1:page)*size,
      
      
      //筛选符合条件的数据
      filteredData=filter?_.filter(mockData,function(d){
          return d.name.indexOf(filter)>-1
      }):mockData;
      //对数据进行分页
      var pageData=_.take(_.slice(filteredData,skipStart),size);
      
      res.json({
          total_records:filteredData.length,
          total_pages:Math.ceil(filteredData.length/size),
          page:page,
          size:size,
          data:pageData
      });
  })
  .post('/api/books',function(req,res){
      //添加新的图书
      mockData.push(req.body)
      res.json(req.body)
  })
  .put('/api/books/:isbn',function(req,res){
      //更新指定的图书对象
      mockData=_.reject(mockData,function(d){
          return d.isbn===req.body.isbn
      })
      mockData.push(req.body)
      res.json({msg:'success'})
  })
  .delete('/api/books',function(req,res){
      //批量删除图书
      mockData=_.reject(mockData,function(d){
          return _.indexOf(req.body,d.isbn)>-1
      })
      res.json({msg:'success'});
  })
  },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.ProvidePlugin({
      //增加codemiror的实例的映射
      CodeMirror:"codemirror",
      Chance:"chance"
    })
  ]

})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
