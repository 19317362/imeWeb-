var express = require('express');
var router = express.Router();



var data1=[{"id":"DBM052809","masterOid":"com.imecms.doc.XMLDocumentMaster:52809","created":"2017-03-24","oid":"com.imecms.doc.homedoc.HomeDocument:1161","name":"DITA文档标记指南","seq":1},{"id":"DM051973","masterOid":"com.imecms.doc.XMLDocumentMaster:51973","created":"2017-03-24","oid":"com.imecms.doc.homedoc.HomeDocument:1162","name":"DITA Open Toolkit, version ","seq":2}]

var data2=[{"text":"普通文档","value":"CommonDoc"},{"text":"手册结构","value":"sDitaMap"},{"text":"手册结构_翻译","value":"sDitaMap_trans"},{"text":"手册发布结构","value":"sDitaBookMap"},{"text":"手册发布结构_翻译","value":"sDitaBookMap_trans"},{"text":"适用性选项","value":"sDitaScheme"},{"text":"sDitaScheme_Tran","value":"sDitaScheme_Trans"},{"text":"主题文档","value":"sDitaTopic"},{"text":"主题文档_翻译","value":"sDitaTopic_trans"},{"text":"操作文档","value":"sDitaTask"},{"text":"操作文档_翻译","value":"sDitaTask_trans"},{"text":"概念文档","value":"sDitaConcept"},{"text":"概念文档_翻译","value":"sDitaConcept_trans"},{"text":"参照文档","value":"sDitaReference"},{"text":"参照文档_翻译","value":"sDitaReference_trans"},{"text":"词汇表文档","value":"sDitaGlossary"},{"text":"词汇表文档_翻译","value":"sDitaGlossary_trans"},{"text":"警示信息","value":"sDitaNote"},{"text":"警示信息_翻译","value":"sDitaNote_trans"},{"text":"MapPublishHTML","value":"sMapPublishHTML"},{"text":"多媒体文件","value":"ImageDoc"},{"text":"多媒体翻译文件","value":"ImageDoc_trans"},{"text":"发布文档","value":"sPublishDoc"},{"text":"翻译导出包","value":"TransFile"},{"text":"问题报告","value":"ChangeIssue"},{"text":"变更任务","value":"ChangeActivity"},{"text":"LinkDoc","value":"sLinkDoc"},{"text":"folderImage","value":"folderImage"},{"text":"PubPDF","value":"PubPDF"},{"text":"TempPDF","value":"TempPDF"},{"text":"HTML正式发布压缩包","value":"PubHTML"},{"text":"HTML临时发布压缩包","value":"TempHTML"},{"text":"all","value":"all"}]

var data3=[{"containerid":"com.imecms.container.Container:7","containername":"D-文档"},{"containerid":"com.imecms.container.Container:123","containername":"P-公共存储库"},{"containerid":"com.imecms.container.Container:126","containername":"P-内部存储库"},{"containerid":"com.imecms.container.Container:124","containername":"P-样例存储库"},{"containerid":"com.imecms.container.Container:125","containername":"R-重用库"},{"containerid":"ALL","containername":"ALL"}]


router.get('/imeWeb/homeDoc',function(req, res){
    res.render('index')
})

router.get('/imeWeb/Services/homeDoc/queryHomeDocs',function(req, res){
    res.json(data1)
})


router.get('/imeWeb/Services/permission/getsofttype',function(req, res){
    res.json(data2)
})

router.get('/imeWeb/Services/container/getContainerByDomainid',function(req, res){
    res.json(data3)
})


module.exports = router;
