var express = require('express');
var router = express.Router();

var globals=require('../lib/global')
/* GET home page. */

var data=[{"number":"SOT035489","createdDate":"2017-02-24","name":"800000220 洗涤液 - 1.5L","visitedItemStatus":"PENDING","visitedItemStatusTitle":"待分发","id":7291,"oid":"com.imecms.doc.XMLDocumentMaster:35489","nameNumber":"800000220 洗涤液 - 1.5L|~|SOT035489","fileType":"Topic"},{"number":"DBM042291","createdDate":"2017-02-23","name":"DITA文档标记指南","visitedItemStatus":"PENDING","visitedItemStatusTitle":"待分发","id":7253,"oid":"com.imecms.doc.XMLDocumentMaster:42291","nameNumber":"DITA文档标记指南|~|DBM042291","fileType":"sDitaBookMap"},{"number":"G122748","createdDate":"2017-02-20","name":"G122748","visitedItemStatus":"ISSUED","visitedItemStatusTitle":"发布","id":7150,"oid":"com.imecms.doc.FileDocumentMaster:122748","nameNumber":"G122748|~|G122748","fileType":"ImageDoc"},{"number":"DTO044409","createdDate":"2017-02-16","name":"简单列表","visitedItemStatus":"PENDING","visitedItemStatusTitle":"待分发","id":7121,"oid":"com.imecms.doc.XMLDocumentMaster:44409","nameNumber":"简单列表|~|DTO044409","fileType":"sDitaTopic"},{"number":"DTG044429","createdDate":"2017-02-16","name":"词汇表术语","visitedItemStatus":"PENDING","visitedItemStatusTitle":"待分发","id":7120,"oid":"com.imecms.doc.XMLDocumentMaster:44429","nameNumber":"词汇表术语|~|DTG044429","fileType":"sDitaGlossary"},{"number":"G122245","createdDate":"2017-02-16","name":"test","visitedItemStatus":"ISSUED","visitedItemStatusTitle":"发布","id":7119,"oid":"com.imecms.doc.FileDocumentMaster:122245","nameNumber":"test|~|G122245","fileType":"TempPDF"},{"number":"DM036343","createdDate":"2017-02-16","name":"test1","visitedItemStatus":"WIP","visitedItemStatusTitle":"编辑","id":7118,"oid":"com.imecms.doc.XMLDocumentMaster:36343","nameNumber":"null|~|DM036343","fileType":"sDitaMap"},{"number":"DM036343","createdDate":"2017-02-16","name":"test2","visitedItemStatus":"WIP","visitedItemStatusTitle":"编辑","id":7118,"oid":"com.imecms.doc.XMLDocumentMaster:36343","nameNumber":"null|~|DM036343","fileType":"ChangeActivity"},{"number":"DM036343","createdDate":"2017-02-16","name":"test3","index -表单.htmlvisitedItemStatus":"WIP","visitedItemStatusTitle":"编辑","id":7118,"oid":"com.imecms.doc.XMLDocumentMaster:36343","nameNumber":"null|~|DM036343","fileType":"trans"},{"number":"DM036343","createdDate":"2017-02-16","name":"test4","visitedItemStatus":"WIP","visitedItemStatusTitle":"编辑","id":7118,"oid":"com.imecms.doc.XMLDocumentMaster:36343","nameNumber":"null|~|DM036343","fileType":"HTML"},{"number":"DM036343","createdDate":"2017-02-16","name":"test5","visitedItemStatus":"WIP","visitedItemStatusTitle":"编辑","id":7118,"oid":"com.imecms.doc.XMLDocumentMaster:36343","nameNumber":"null|~|DM036343","fileType":"PDF"}]


router.get('/Services/uf/getFavoriteItems?',function(req, res){
    res.json(data)
})





// router.get('/imeWeb/Services/container/getContainerByDomainAndUser',function(req, res){

//    res.json([{"containername":"D-文档","containerid":"com.imecms.container.Container:136"},{"containername":"Document","containerid":"com.imecms.container.Container:164"},{"containername":"P-公共存储库","containerid":"com.imecms.container.Container:138"},{"containername":"P-内部存储库","containerid":"com.imecms.container.Container:115"},{"containername":"R-重用库","containerid":"com.imecms.container.Container:137"},{"containername":"权限测试用存储库","containerid":"com.imecms.container.Container:135"}])


// })

// router.get('/imeWeb/Services/folder/selectFileTree',function(req,res){
//     res.json([{"children":[{"expand":true,"filename":"D-文档","children":[{"filename":"02-Topic","children":[{"filename":"021-Topic","children":[],"id":"1526","showfilepath":"/02-Topic/021-Topic"}],"id":"1525","showfilepath":"/02-Topic"},{"filename":"1","children":[],"id":"1278","showfilepath":"/1"}],"id":"root","showfilepath":""}],"text":"D-文档"}])


// })




module.exports = router;
