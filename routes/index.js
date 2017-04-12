var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/imeWeb/index',function(req, res,next){
    res.render('index')
})
router.get('/imeWeb/index.html',function(req, res,next){
    res.render('index')
})
router.get('/imeWeb/home',function(req, res,next){
    res.render('index')
})

router.get('/Services/principal/checkUser',function(req,res,next){
    res.json({"success":true,"principalId":"hurong"})
})

router.get('/Services/principal/getLoginUser',function(req,res,next){
    res.json({"id":"hurong","name":"胡蓉"})

})

router.get('/Services/lang/getBrowserInfo',function(req,res,next){
    res.json({"domain":"HIGHTECH","language":"zh"})

})

router.get('/Services/domain/getSessionDomainAndJsFiles',function(req,res,next){
    res.json({"success":"true","domainname":"高科技站点","domainjsfile":["imeInit.js"],"domainkey":"HIGHTECH","domaincssfile":["custom.css"],"domainid":"com.imecms.container.Domain:55"})

})

router.get('/Services/domain/setSessionDomain',function(req,res,next){
    res.json({"domaincount":4,"success":true,"domainname":"高科技站点","domainkey":"HIGHTECH","domainid":"com.imecms.container.Domain:55"})

})

module.exports = router;
