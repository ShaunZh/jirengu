/*
* @Author: Marte
* @Date:   2017-06-27 11:41:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-27 11:41:46
*/

'use strict';
/*
* @Author: Marte
* @Date:   2017-06-20 09:27:10
* @Last Modified by:   Marte
* @Last Modified time: 2017-06-21 16:07:51
*/

router.get('/loadmore', function(req, res){
    var index = parseInt(req.query.index);
    var length = parseInt(req.query.length);
    var response = {};
    if (typeof index === 'number' && typeof length === 'number' && length <= 5) {
        if (index >= 3) {                // 没有数据了
            response["status"] = 401;
        } else {
          response["status"] = 200;      // 数据正常
          response["data"] = []
          for (var i = 0; i < length; i++) {
              response["data"].push("数据" + (index*5 + i) );
          }
        }
    } else {
        // 数据格式错误
        response["status"] = 402;
    }
    // res.header("Access-Control-Allow-Origin", "*")
    setTimeout(function(){
        res.send(response);
    }, 1000);
});

router.post('/loadmore', function(req, res){
    var index = parseInt(req.body.index);
    var length = parseInt(req.body.length);
    var response = {};
    if (typeof index === 'number' && typeof length === 'number' && length <= 5) {
        if (index >= 3) {                // 没有数据了
            response["status"] = 401;
        } else {
          response["status"] = 200;      // 数据正常
          response["data"] = []
          for (var i = 0; i < length; i++) {
              response["data"].push("数据" + (index*5 + i) );
          }
        }
    } else {
        // 数据格式错误
        response["status"] = 402;
    }
    setTimeout(function(){
      res.send(response);
    }, 1000);
});
