var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var debtList = [[ 2, 3, "0xbbb", 10, true],[4, 5, "0xbbb1111", 20, true]];

  var oList = [[1,"Det","0xtest", true, "0xtet" ],["1", "test","0xed9d02e382b34818e88b88a309c7fe71e65f419d", false, "0xed9d02e382b34818e88b88a309c7fe71e65f419d"]];


  res.render('index', { currentDebt: 1000, orderList: oList, debtList: debtList});
});

module.exports = router;
