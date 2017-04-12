var express = require('express');
var router = express.Router();

var globals=require('../lib/global')
/* GET home page. */

var data=[{"id":"46370","softtype":"用户手册","actionerId":"hurong","docName":"标准标签演示维修手册","actionDate":"2017-02-24 16:36:03","domainKey":"CAR","actionType":"PUBLISH","docNumber":"SOM035487","ip":"0:0:0:0:0:0:0:1"},{"id":"46386","softtype":"用户手册","actionerId":"hurong","docName":"标准标签演示维修手册","actionDate":"2017-02-24 16:38:48","domainKey":"CAR","actionType":"PUBLISH","docNumber":"SOM035487","ip":"0:0:0:0:0:0:0:1"},{"id":"46386","softtype":"用户手册","actionerId":"hurong","docName":"标准标签演示维修手册","actionDate":"2017-02-24 16:37:48","domainKey":"CAR","actionType":"PUBLISH","docNumber":"SOM035487","ip":"0:0:0:0:0:0:0:1"}]


router.get('/Services/sysLog/listSysLogRecord',function(req, res){
    res.json(data)
})



module.exports = router;
