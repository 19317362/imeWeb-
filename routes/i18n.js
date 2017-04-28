var express = require('express');
var router = express.Router();

var globals=require('../lib/global')
/* GET home page. */

router.get('/js/templates.js',function(req, res){
    res.sendFile('public/js/templates/templates.js', { root :'C:/Users/zhengying/Desktop/node后端训练场/myapp/'})
})


router.get('/imeWeb/i18n/:properties',function(req, res){
    var pro=req.params.properties;
    res.sendFile('public/i18n/'+pro, { root :'C:/Users/zhengying/Desktop/node后端训练场/myapp/'})
})

router.get('/imeWeb/img/:file',function(req, res){
    var file=req.params.file
    res.sendFile('public/img/'+file, { root :'C:/Users/zhengying/Desktop/node后端训练场/myapp/'})
})

router.get('/imeWeb/images/:file',function(req, res){
    var file=req.params.file
    res.sendFile('public/images/'+file, { root :'C:/Users/zhengying/Desktop/node后端训练场/myapp/'})
})

router.get('/imeWeb/img/:folder/:file',function(req, res){
    var folder=req.params.folder
    var file=req.params.file
    res.sendFile('public/img/'+folder+'/'+file, { root :'C:/Users/zhengying/Desktop/node后端训练场/myapp/'})
})

router.get('/imeWeb/assets/pages/img/login/:file',function(req, res){
    var file=req.params.file
    res.sendFile('public/assets/pages/img/login/'+'/'+file, { root :'C:/Users/zhengying/Desktop/node后端训练场/myapp/'})
})



module.exports = router;
