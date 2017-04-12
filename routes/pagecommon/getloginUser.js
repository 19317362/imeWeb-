var express = require('express');
var router = express.Router();


/* 顶部登录. */

var data={"id":"hurong","name":"胡蓉"}


router.get('/Services/principal/getLoginUser',function(req, res){
    res.json(data)
})



module.exports = router;
