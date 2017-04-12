var express = require('express');
var router = express.Router();



var data=[{"name":"vv","principalId":"vv","oId":"com.imecms.principal.Group:563","id":563},{"name":"站点手册结构工程师组","principalId":"SAMapStructureMG","oId":"com.imecms.principal.Group:544","id":544},{"name":"站点业务管理员组","principalId":"SADomainBAG","oId":"com.imecms.principal.Group:543","id":543,"desc":"可对重用库进行写操作的人员"},{"name":"HTDomainBbbb","principalId":"HTDomainBAB","oId":"com.imecms.principal.Group:522","id":522,"desc":"HTDomainBbb"},{"name":"VOMegaTestG","principalId":"VOMegaTestG","oId":"com.imecms.principal.Group:506","id":506,"desc":"VOMegaTestG"},{"name":"Document","principalId":"Document","oId":"com.imecms.principal.Group:505","id":505,"desc":"Document"},{"name":"站点业务管理员组","principalId":"VODomainBAG","oId":"com.imecms.principal.Group:504","id":504,"desc":"可对重用库进行写操作的人员"},{"name":"站点手册结构工程师组","principalId":"VOMapStructureMG","oId":"com.imecms.principal.Group:503","id":503,"desc":"手册管理者组，可以进行map任务分配"},{"name":"汽车站点业务管理员组","principalId":"CDomainBAG","oId":"com.imecms.principal.Group:408","id":408,"desc":"汽车站点业务管理员组"},{"name":"汽车美嘉林测试组","principalId":"CMegaTest","oId":"com.imecms.principal.Group:406","id":406,"desc":"汽车美嘉林测试组"},{"name":"HTDomainBAG","principalId":"HTDomainBAG","oId":"com.imecms.principal.Group:405","id":405,"desc":"HTDomainBAG"},{"name":"HighTechG","principalId":"HighTechG","oId":"com.imecms.principal.Group:404","id":404,"desc":"高科技组\n"},{"name":"HTMegaTest","principalId":"HTMegaTest","oId":"com.imecms.principal.Group:403","id":403,"desc":"HTMegaTest"},{"name":"HTMapStructureMG","principalId":"HTMapStructureMG","oId":"com.imecms.principal.Group:402","id":402,"desc":"HTMapStructureMG"},{"name":"feedBackGroup","principalId":"feedBackGroup","oId":"com.imecms.principal.Group:364","id":364},{"name":"手册结构工程师组","principalId":"CMapStructureMG","oId":"com.imecms.principal.Group:363","id":363,"desc":"手册结构工程师组"},{"name":"DMegaTest","principalId":"DMegaTest","oId":"com.imecms.principal.Group:342","id":342,"desc":"美嘉测试组"},{"name":"默认组","principalId":"DefaultG","oId":"com.imecms.principal.Group:326","id":326,"desc":"default站点的默认加入组"}]


router.get('/imeWeb/groupManagement',function(req, res){
    res.render('index')
})
//?&groupId=&groupName=
router.get('/Services/principal/searchGroups',function(req, res){
    res.json(data)
})



module.exports = router;
