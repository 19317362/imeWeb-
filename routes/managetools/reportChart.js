var express = require('express');
var router = express.Router();



// var data=[{"containerid":"com.imecms.container.Container:7","containerisAvailable":"启用","containername":"D-文档","containerdesc":"文档，一般文档存储对象"},{"containerid":"com.imecms.container.Container:123","containerisAvailable":"启用","containername":"P-公共存储库","containerdesc":"公开给外部注册人员使用的存储库"},{"containerid":"com.imecms.container.Container:126","containerisAvailable":"启用","containername":"P-内部存储库","containerdesc":"用于确认问题，测试问题的内部专用存储库"},{"containerid":"com.imecms.container.Container:124","containerisAvailable":"启用","containername":"P-样例存储库","containerdesc":"dita数据的使用样本库，可以用做初次使用的参考"},{"containerid":"com.imecms.container.Container:125","containerisAvailable":"启用","containername":"R-重用库","containerdesc":"重用库，用来存储共用对象"}]


router.get('/imeWeb/reportchart',function(req, res){
    res.render('index')
})




module.exports = router;
