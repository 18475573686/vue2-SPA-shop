var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('用户路由'); // 返回一个字符串
});

module.exports = router;
