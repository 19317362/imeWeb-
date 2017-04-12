var express = require('express');
var router = express.Router();

var globals=require('../lib/global')
/* GET home page. */

var data={"receiveTask":{"allwork":35,"cjwork":0,"finishTaskNumber":48,"qtwork":2,"deadwork":33,"jjwork":0},"originateTask":{"originatePending":39,"originateExigence":0,"originateFinish":12}}


router.get('/Services/workflow/queryMyTasksNumber',function(req, res){
    res.json(data)
})


module.exports = router;
