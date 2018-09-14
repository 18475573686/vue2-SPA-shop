var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('./../models/goods.js')

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/vue_shop');

mongoose.connection.on('connected', function() { // 数据库连接事件的监听
  console.log('MongoDB connected success.')
});

mongoose.connection.on('error', function() { // 数据库错误事件的监听
  console.log('MongoDB connected fail.')
});

mongoose.connection.on('disconnected', function() { // 数据库断开事件的监听
  console.log('MongoDB connected disconnected.')
});

/* 查询商品列表的数据 */
router.get('/', function(req, res, next) {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let params = {};
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      });
    }
  })
});

module.exports = router;
