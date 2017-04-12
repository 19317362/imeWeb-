var express = require('express');
var router = express.Router();


/* 顶部登录. */

var data=[{"text":"XML编辑器","title":"xmlEditor2","back":"iconfont icon-edit1","url":"javascript:alert('XML编辑器暂未修改');?superuser=885b45d9636efed4"},{"text":"上传文件","title":"uploadFile","back":"iconfont icon-comiisshangchuan","url":"javascript:alert('上传文件暂未修改');?superuser=885b45d9636efed4"}]


router.get('/Services/uf/getToolButtonList',function(req, res){
    res.json(data)
})



module.exports = router;
