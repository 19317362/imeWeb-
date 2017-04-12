var express = require('express');
var router = express.Router();

var globals=require('../lib/global')
/* GET home page. */

var data=[{"id":5744,"fileType":"File","days":0,"nameNumber":"11|~|PM000061","oid":"com.imecms.part.Part:305","name":"11","number":"PM000061"},{"id":7852,"fileType":"XML","days":1,"nameNumber":"omb00000200.ditamap|~|OM047546","oid":"com.imecms.doc.XMLDocument:50597","name":"omb00000200.ditamap","number":"OM047546"},{"id":7847,"fileType":"XML","days":1,"nameNumber":"czvzcxvz|~|OM047482","oid":"com.imecms.doc.XMLDocument:50529","name":"czvzcxvz","number":"OM047482"},{"id":7850,"fileType":"XML","days":2,"nameNumber":"sfsdfds|~|ST047544","oid":"com.imecms.doc.XMLDocument:50594","name":"sfsdfds","number":"ST047544"},{"id":7849,"fileType":"XML","days":2,"nameNumber":"sdasd|~|SC047543","oid":"com.imecms.doc.XMLDocument:50592","name":"sdasd","number":"SC047543"},{"id":7848,"fileType":"XML","days":2,"nameNumber":"制动|~|OT047528","oid":"com.imecms.doc.XMLDocument:50575","name":"制动","number":"OT047528"},{"id":7846,"fileType":"XML","days":2,"nameNumber":"xczx|~|OM047477","oid":"com.imecms.doc.XMLDocument:50528","name":"xczx","number":"OM047477"},{"id":7845,"fileType":"XML","days":2,"nameNumber":"vcxvcx|~|OT047476","oid":"com.imecms.doc.XMLDocument:50522","name":"vcxvcx","number":"OT047476"},{"id":7844,"fileType":"XML","days":2,"nameNumber":"jjjj|~|OT047475","oid":"com.imecms.doc.XMLDocument:50520","name":"jjjj","number":"OT047475"},{"id":7843,"fileType":"XML","days":2,"nameNumber":"jjj|~|OT047462","oid":"com.imecms.doc.XMLDocument:50506","name":"jjj","number":"OT047462"}]


router.get('/Services/uf/recentVisted',function(req, res){
    res.json(data)
})



module.exports = router;
