var g_current_user;

var g_url_serviceBase = "http://localhost:8800";
var g_url_xmlEditor = g_url_serviceBase +"index.html";
var g_floatMenuArry = [];
var g_viewFloatMenu = null;
//2016.10.13 浮动菜单  tangchenbing
var g_url_getFloatMenuConfig = g_url_serviceBase + 'Services/view/getFloatMenuByOid?';



var g_url_login = g_url_serviceBase + 'Services/principal/login?';
var g_url_logout = g_url_serviceBase + 'Services/principal/logout?';
var g_url_getLoginUser = g_url_serviceBase + 'Services/principal/getLoginUser?';
var g_url_queryAssignments = g_url_serviceBase + 'Services/workflow/queryAssignments?';
var g_url_queryMyTasks = g_url_serviceBase + '/Services/workflow/queryMyTasks?';
var g_url_queryMyTasksNumber = g_url_serviceBase + '/Services/workflow/queryMyTasksNumber';
var g_url_getOriginateAssignment = g_url_serviceBase + '/Services/workflow/getOriginateAssignment';
var g_url_queryMyTasksShowHomepage = g_url_serviceBase + 'Services/workflow/queryMyTasksShowHomepage';
var g_url_completeAssignment = g_url_serviceBase + 'Services/workflow/completeAssignment?';
var g_url_batchCompleteAssignment = g_url_serviceBase + 'Services/workflow/batchCompleteAssignment?';

var g_url_checkTaskRoles = g_url_serviceBase + 'Services/workflow/checkTaskRoles?';

var g_url_queryDocInfo = g_url_serviceBase + 'Services/doc/getDoc?';
var g_url_updateDocInfo = g_url_serviceBase + 'Services/doc/updateDoc';
var g_url_queryObjectInfo = g_url_serviceBase + 'Services/persist/getObject?';
var g_url_getToolButtonList = g_url_serviceBase+'/Services/uf/getToolButtonList';

var g_url_listReleatedDocs = g_url_serviceBase + 'Services/doc/listReleatedDocs?';
var g_url_addReleatedDocs = g_url_serviceBase + 'Services/doc/addReleatedDocs?';
var g_url_deleteReleatedDocs = g_url_serviceBase + 'Services/doc/deleteReleatedDocs?';

var g_url_queryUsers = g_url_serviceBase + 'Services/principal/queryUsers?';
var g_url_listUsers = g_url_serviceBase + 'Services/principal/listUsers?';
var g_url_queryUsersByDocid = g_url_serviceBase + 'Services/principal/queryUsersByDocid?';
var g_url_queryGroupUsersAndGroups=g_url_serviceBase+'Services/principal/queryGroupUsersAndGroups?';
//var g_url_queryRoles = g_url_serviceBase + 'Services/principal/queryRoles?';
var g_url_addUserToRole = g_url_serviceBase + 'Services/principal/addUserToRole?';
var  g_url_addUserToRoles = g_url_serviceBase + 'Services//principal/addUserToRoles?';
var g_url_removeUserToRole = g_url_serviceBase + 'Services/principal/removeUserToRole?';
var g_url_removeTasksRole = g_url_serviceBase + 'Services/principal/removeTasksRole?';

var g_url_listSysLogRecord=g_url_serviceBase+'/Services/sysLog/listSysLogRecord';

var g_url_selectFileTree = g_url_serviceBase +"/Services/folder/selectFileTree";
var g_url_selectFileInIme = g_url_serviceBase +"Services/folder/listFolderFiles?";
var g_url_searchMapFiles = g_url_serviceBase+'Services/folder/searchMapFiles';
var g_url_getIMEChartMapPath=g_url_serviceBase+'Services/doc/chartMap?';
var g_url_newFolder=g_url_serviceBase+'Services/folder/newFolder?';
var g_url_updateFolder=g_url_serviceBase+'Services/folder/updateFolder?';
var g_url_newFile=g_url_serviceBase+'Services/folder/newFile';
var g_url_removeFiles=g_url_serviceBase+'Services/folder/removeDocs?';
var g_url_removeFolder=g_url_serviceBase+'Services/folder/removeFolder?';
var g_url_copyContainerStruct=g_url_serviceBase+'Services/folder/copyContainerStruct?';

var g_url_softtypeList=g_url_serviceBase+'Services/filedoc/getSofttypeList?';
var g_url_FilesofttypeList=g_url_serviceBase+'Services/filedoc/getFileSofttypeList?';
var g_url_softtypeInfo=g_url_serviceBase+'Services/filedoc/getSofttypeInfo?';
var g_url_softtypeInfoByList=g_url_serviceBase+'Services/filedoc/getSofttypeInfoByList?';
var g_url_saveDoc=g_url_serviceBase+'Services/filedoc/saveDoc?';
var g_url_saveZip=g_url_serviceBase+'Services/filedoc/saveZip?';
var g_url_uploadsofttype=g_url_serviceBase+'Services/filedoc/getuploadsofttype';
var g_url_readsofttype=g_url_serviceBase+'Services/filedoc/getreadsofttype';
var g_url_updateDoc=g_url_serviceBase+'Services/filedoc/updateDoc?';
var g_url_saveSearchTemplate = g_url_serviceBase+'Services/query/saveSearchTemplate';
var g_url_templateList = g_url_serviceBase+'Services/query/listSearchTemplate';

var g_url_saveAs=g_url_serviceBase+'Services/filedoc/saveAs?';
var g_url_getStorageSpace=g_url_serviceBase+'Services/editor/getStorageSpace';
var g_url_queryWfDefine = g_url_serviceBase + 'Services/workflow/queryWfDefine?';
var g_url_validateWfDefine = g_url_serviceBase + 'Services/workflow/validateWfDefine';
var g_url_uploadWfDefine = g_url_serviceBase + 'Services/workflow/uploadWfDefine';
var g_url_queryProcess = g_url_serviceBase + 'Services/workflow/queryProcess?';
var g_url_terminatedProcess = g_url_serviceBase + 'Services/workflow/terminatedProcess?';
var g_url_createProcess = g_url_serviceBase + 'Services/workflow/start?';
var g_url_queryObjects = g_url_serviceBase + 'Services/workflow/queryObjects?';
var g_url_getwfDefine = g_url_serviceBase + 'Services/workflow/getwfDefine?';
var g_url_queryProcessesByPboId = g_url_serviceBase + 'Services/workflow/queryProcessesByPboId?';
var g_url_queryProcessXml = g_url_serviceBase + 'Services/workflow/queryProcessXml?';
var g_url_reAssignment = g_url_serviceBase + 'Services/workflow/reAssignment?';
//xml文件操作

var g_url_documentStructureTreeByOid=g_url_serviceBase+'Services/xmldoc/getdocumentStructureTreeByOid';
var g_url_getConrefContent = g_url_serviceBase+'Services/xml/getConrefContent';
var g_url_saveasByTemplate = g_url_serviceBase+'Services/doc/saveasByTemplate';
var g_url_queryDocByIBAS = g_url_serviceBase+'Services/doc/queryDocByIBAS?';
var g_url_createBaseLinkByOid = g_url_serviceBase+'Services/xmldoc/createBaseLinkByOid';
var g_url_checkIn = g_url_serviceBase + 'Services/filedoc/checkin?';
var g_url_checkOut = g_url_serviceBase + 'Services/filedoc/checkout?';

var g_url_compareBaseline = g_url_serviceBase + 'Services/doc/compareBaseLine?';


//站点相关url
var g_url_addDomain=g_url_serviceBase+'Services/domain/addDomain';
var g_url_removeDomianById=g_url_serviceBase+'Services/domain/removeDomianById';
var g_url_getDomainByOid=g_url_serviceBase+'Services/domain/getDomainByOid';
var g_url_updateDomain=g_url_serviceBase+'Services/domain/updateDomain';
var g_url_getAllDomain=g_url_serviceBase+'Services/domain/getAllDomain';
var g_url_setDomainUser=g_url_serviceBase+'Services/domain/setDomainUser';
var g_url_getDomainByUser=g_url_serviceBase+'Services/domain/getDomainByUser';
var g_url_removeDomainUser=g_url_serviceBase+'Services/domain/removeDomainUser';
var g_url_setSessionDomain=g_url_serviceBase+'/Services/domain/setSessionDomain';
var g_url_getSessionDomain=g_url_serviceBase+'Services/domain/getSessionDomain';
var g_url_domainDataIsRepeat=g_url_serviceBase+'Services/domain/domainDataIsRepeat';
var g_url_addHomeDocs = g_url_serviceBase + 'Services/homeDoc/addHomeDocs';
var g_url_deleteHomeDocs = g_url_serviceBase + 'Services/homeDoc/deleteHomeDocs';
var g_url_queryHomeDocs = g_url_serviceBase + 'Services/homeDoc/queryHomeDocs';

//存储空间相关url
var g_url_addContainer=g_url_serviceBase+'Services/container/addContainer';
var g_url_updateContainer=g_url_serviceBase+'Services/container/updateContainer';
var g_url_getContainerByDomain=g_url_serviceBase+'/Services/container/getContainerByDomain';
var g_url_getContainerByDomainid=g_url_serviceBase+'Services/container/getContainerByDomainid';
var g_url_getContainerByDomainAndUser=g_url_serviceBase+'/Services/container/getContainerByDomainAndUser';
var g_url_getFristContainerByDomainAndUser=g_url_serviceBase+'Services/container/getFristContainerByDomainAndUser';
var g_url_getContainerByOid=g_url_serviceBase+'Services/container/getContainerByOid';
var g_url_setContainerUser=g_url_serviceBase+'Services/container/setContainerUser';
var g_url_removeContainerUser=g_url_serviceBase+'Services/container/removeContainerUser';
var g_url_removeDomainContainer=g_url_serviceBase+'Services/container/removeDomainContainer';
var g_url_movefile=g_url_serviceBase+'Services/folder/movefile?';
var g_url_movefiles=g_url_serviceBase+'Services/folder/movefiles?';
var g_service_selectFileTree = g_url_serviceBase+'Services/folder/selectFileTree';
var g_url_getNavigationContainers = g_url_serviceBase + '/Services/uf/getNavigationContainers';


//基线
var g_url_createBaseLine = g_url_serviceBase + '/Services/doc/createBaseLink?';

var g_url_listContainerActions=g_url_serviceBase+'Services/container/listActions?';
//用户相关URL
var g_url_getUserByDomian=g_url_serviceBase+'Services/principal/getUserByDomian';
var g_url_getUserByContainer=g_url_serviceBase+'Services/principal/getUserByContainer';
var g_url_searchUser=g_url_serviceBase+'Services/principal/searchUser';
var g_url_searchGroups=g_url_serviceBase+'/Services/principal/searchGroups?';
var g_url_getPermissionByContainer=g_url_serviceBase +'Services/permission/getPermissionByContainer';
var g_url_addPermission=g_url_serviceBase+'Services/permission/addPermission';
var g_url_addPermissions=g_url_serviceBase+'Services/permission/addPermissions';
var g_url_deletePermission=g_url_serviceBase+'Services/permission/deletePermission';
var g_url_deletePermissions=g_url_serviceBase+'Services/permission/deletePermissions';
var g_url_updatePermission=g_url_serviceBase+'Services/permission/updatePermission';
var g_url_getsofttype = g_url_serviceBase+'Services/permission/getsofttype';
var g_url_getsofttypeLifecycle = g_url_serviceBase+'Services/permission/getsofttypeLifecycle';
var g_url_getlifecycle = g_url_serviceBase+'Services/permission/getlifecycle';
var g_url_getUserGroup = g_url_serviceBase+'Services/principal/getUserGroup?';
var g_url_saveUserAndGroup = g_url_serviceBase+'Services/principal/saveUserAndGroup';
var g_url_isAdministrator = g_url_serviceBase +'Services/permission/isAdministrator';
var g_url_searchPassword=g_url_serviceBase+'Services/principal/searchPassword';
var g_url_modifyPassword=g_url_serviceBase+'Services/principal/modifyPassword';
var g_url_searchUserImage=g_url_serviceBase+'/Services/principal/searchUserImage';
var g_url_shareObject=g_url_serviceBase+'/Services/principal/shareObject';

//组
var g_url_showGroupTree=g_url_serviceBase+'Services/principal/showGroupTree';
//var g_url_queryGroupTree = g_url_serviceBase + 'Services/principal/loadGroupTree';

var g_url_createUser = g_url_serviceBase + 'Services/principal/createUser';
var g_url_queryGroupUser = g_url_serviceBase + 'Services/principal/queryGroupUser?';
var g_url_queryUsers = g_url_serviceBase + 'Services/principal/queryUsers?';
var g_url_createGroup = g_url_serviceBase + 'Services/principal/createGroup';
var g_url_saveGroup = g_url_serviceBase + 'Services/principal/saveGroup';
var g_url_removeUserFromGroup = g_url_serviceBase + 'Services/principal/removeUserFromGroup?';
var g_url_unAssignedGroups = g_url_serviceBase + 'Services/principal/queryNonParentGroups';
var g_url_getNonParentGroupsByNameAndId = g_url_serviceBase + 'Services/principal/getNonParentGroupsByNameAndId?';
var g_url_deleteGroup = g_url_serviceBase + 'Services/principal/deleteGroup?';
var g_url_queryGroupAllUser = g_url_serviceBase + 'Services/principal/queryGroupAllUser?';
var g_url_saveUser = g_url_serviceBase + 'Services/principal/saveUser';
var g_url_loadUserGroup = g_url_serviceBase + 'Services/principal/loadUserGroup?';
var g_url_getLoginUser = g_url_serviceBase + '/Services/principal/getLoginUser';
var g_url_login = g_url_serviceBase + '/Services/principal/login';
var g_url_queryUsersByGroups = g_url_serviceBase + 'Services/principal/queryUsersByGroups?';
var g_url_addUserToRole = g_url_serviceBase + 'Services/principal/addUserToRole?';
var g_url_removeUserToRole = g_url_serviceBase + 'Services/principal/removeUserToRole?';
var g_url_queryRoles = g_url_serviceBase + 'Services/principal/queryRoles?';
var g_url_queryTasksRoles = g_url_serviceBase + 'Services/principal/queryTasksRoles?';

var g_url_createMembers=g_url_serviceBase+'Services/principal/createMembers';
var g_url_saveMembers=g_url_serviceBase+'Services/principal/saveMembers';
var g_url_loadMembers=g_url_serviceBase+'Services/principal/loadMembers?';
var g_url_createGroup=g_url_serviceBase+'Services/principal/createGroup?';
var g_url_updateGroup=g_url_serviceBase+'Services/principal/updateGroup?';
//图片
var g_url_ShowImage=g_url_serviceBase+'jsp/util/binaryContent.jsp?';

var g_url_taskinfoPages = g_url_serviceBase + 'Services/workflow/queryTaskPages?';

var g_url_affectedDocs = g_url_serviceBase + 'Services/changeactivity/queryAffectedDocs?';
var g_url_saveChangeLink = g_url_serviceBase + 'Services/changeactivity/saveChangeLink?';
var g_url_queryCheckInTypes = g_url_serviceBase + 'Services/doc/queryCheckInTypes?';

var g_url_getWfDefineByOid = g_url_serviceBase + 'Services/workflow/getWfDefineByOid?';
var g_url_saveWfDefine = g_url_serviceBase +'Services/workflow/saveWfDefine?';
//数据导入
var g_url_uploadUserInfo=g_url_serviceBase+"Services/uploadData/uploadUserInfo";

//队列管理相关
var g_url_queues=g_url_serviceBase+"Services/queue/queues";
var g_url_queueItems=g_url_serviceBase+"Services/queue/queue/items";


//多语言
var g_url_getLang=g_url_serviceBase+'/Services/lang/getLangSet';
var g_url_getBrowserInfo=g_url_serviceBase+'/Services/lang/getBrowserInfo';
var g_url_changeLang = g_url_serviceBase+'/Services/lang/changeLang';

//访问记录
var g_url_deleteFavoriteItem = g_url_serviceBase+'/Services/uf/deleteFavoriteItem?';
var g_url_getFavoriteItems = g_url_serviceBase+'/Services/uf/getFavoriteItems?';
var g_url_getVisitedItems = g_url_serviceBase+'/Services/uf/recentVisted?';
var g_url_getCheckoutList = g_url_serviceBase+'/Services/uf/checkoutlist?';
var g_url_getUpdatedList = g_url_serviceBase+'/Services/uf/updatedList?';
var g_url_getHomePageConfig = g_url_serviceBase+'/Services/uf/homePageConfig?';
var g_url_reloadConfig = g_url_serviceBase+'/Services/uf/reloadConfig?';
var g_url_getMonitorInfos = g_url_serviceBase+'/Services/monitor/myMonitors?';
var g_url_getMonitorStatus = g_url_serviceBase+'/Services/monitor/getStatus?';

//客制化配置
var g_url_getSessionDomainAndJsFiles=g_url_serviceBase+'/Services/domain/getSessionDomainAndJsFiles';

//打开操作
var g_url_getOpenObjInfo = g_url_serviceBase+'/Services/container/getOpenObjectInfo?';

//系统配置
var g_url_listSystemTool = g_url_serviceBase+'/Services/sys/listSystemTools?';
//系统参数
var g_url_getSystemParams = g_url_serviceBase+'/Services/sys/getSystemParams?';

//TIS指定存储库文件查询
var g_url_tisFolders = g_url_serviceBase+'/Services/export/listFolder?';
var g_url_tisTree = g_url_serviceBase+'/Services/export/getTree?';
var g_url_exportFile = g_url_serviceBase+'/Services/export/exportFile?';
//品牌车系授权客制化
var g_url_tis_listAuthTechDataCar = g_url_serviceBase+"/Services/authTechData/listAuthTechDataCar";
var g_url_tis_listCurCarlineAuthUser = g_url_serviceBase+"/Services/authTechData/listCurCarlineAuthUser";
var g_url_tis_listBrandSocialUser = g_url_serviceBase+"/Services/authTechData/listBrandSocialUser";
var g_url_tis_authUserToCarLine = g_url_serviceBase+"/Services/authTechData/authUserToCarLine";
var g_url_tis_getAuthTimeLength = g_url_serviceBase+"/Services/authTechData/getAuthTimeLength";
var g_url_tis_getExtUserAttributes = g_url_serviceBase+"/Services/principal/getExtUserAttributes";

//翻译
var g_url_getTranslationLangs =  g_url_serviceBase+"Services/translate/loadTranslationLangs";
var g_url_updateTranslationLangs = g_url_serviceBase + "Services/translate/updateTranslateInfos";
var g_url_deleteTranslateLangs = g_url_serviceBase + "Services/translate/deleteTranslateLangs";

// 防止html缓存以及当前Domain与Cookies里的Domain不一致。
var g_url_check_user = g_url_serviceBase+'/Services/principal/checkUser';
var g_url_check_domain = g_url_serviceBase+'/Services/principal/checkDomain?curDomain=';

