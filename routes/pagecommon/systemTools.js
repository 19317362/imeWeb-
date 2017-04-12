var express = require('express');
var router = express.Router();


/* GET home page. */

var data={"children":[{"panelClass":"ime.view.siteInfoPanel","name":"siteInfo","title":"站点信息","iconClass":"icon-wallet"},{"panelClass":"ime.view.GroupPanel","name":"groupManagement","title":"组管理","iconClass":"icon-loop"},{"panelClass":"ime.view.containerPanel2","name":"containerManagement","title":"存储库管理","iconClass":"icon-folder"},{"panelClass":"ime.view.UserConfigPanel","name":"userManagement","title":"用户管理","iconClass":"icon-user"},{"panelClass":"ime.view.WorkflowConfigPanelClass","name":"workflowManagement","title":"工作流管理","iconClass":"icon-link"},{"panelClass":"ime.view.queueManagerPanel","name":"queueManagement","title":"队列管理","iconClass":"icon-layers"},{"panelClass":"ime.view.homeDocWindow","name":"homeDoc","title":"桌面文档","iconClass":"icon-layers"},{"panelClass":"ime.view.sysLogRecordPanel","name":"logRecord","title":"文档日志","iconClass":"icon-star"},{"panelClass":"ime.view.translationConfig","name":"translationLangManagement","title":"翻译语言管理","iconClass":"icon-note"},{"panelClass":"ime.view.systemInfoPanel","name":"systemInfo","title":"系统信息","iconClass":"icon-info"}],"success":true}


router.get('/Services/sys/listSystemTools',function(req, res){
    res.json(data)
})



module.exports = router;
