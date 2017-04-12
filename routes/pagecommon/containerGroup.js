var express = require('express');
var router = express.Router();

//所有存储库及其点击下拉列表
/* GET home page. */

var data=[{"containername":"D-文档","containerid":"com.imecms.container.Container:153"},{"containername":"P-test12","containerid":"com.imecms.container.Container:168"},{"containername":"P-公共存储库","containerid":"com.imecms.container.Container:146"},{"containername":"P-内部存储库","containerid":"com.imecms.container.Container:149"},{"containername":"P-样例存储库","containerid":"com.imecms.container.Container:154"},{"containername":"R-重用库","containerid":"com.imecms.container.Container:152"},{"containername":"出版结果","containerid":"com.imecms.container.Container:132"}]

var data2={"children":[{"expand":true,"filename":"D-文档","children":[{"filename":"02-Topic","children":[{"filename":"021-Topic","children":[],"id":"1891","showfilepath":"/02-Topic/021-Topic"},{"filename":"022-Concept","children":[],"id":"1889","showfilepath":"/02-Topic/022-Concept"},{"filename":"023-Task","children":[],"id":"1892","showfilepath":"/02-Topic/023-Task"},{"filename":"024-Reference","children":[],"id":"1888","showfilepath":"/02-Topic/024-Reference"}],"id":"1887","showfilepath":"/02-Topic"},{"filename":"03-Glossary","children":[],"id":"1894","showfilepath":"/03-Glossary"},{"filename":"04-Note","children":[],"id":"1890","showfilepath":"/04-Note"},{"filename":"10-Deliverables","children":[{"filename":"101-PDF","children":[{"filename":"1011-TempPDF","children":[],"id":"1897","showfilepath":"/10-Deliverables/101-PDF/1011-TempPDF"}],"id":"1896","showfilepath":"/10-Deliverables/101-PDF"}],"id":"1895","showfilepath":"/10-Deliverables"},{"filename":"11-Multimedia","children":[],"id":"1893","showfilepath":"/11-Multimedia"},{"filename":"test","children":[],"id":"1584","showfilepath":"/test"}],"id":"root","showfilepath":""}],"text":"D-文档"}

router.get('/Services/container/getContainerByDomainAndUser',function(req, res){
    res.json(data)
})

router.get('/Services/folder/selectFileTree',function(req, res){
    res.json(data2)
})



module.exports = router;
