var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '商城后台' }); // 返回渲染页面
});

module.exports = router;
