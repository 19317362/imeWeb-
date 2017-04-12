var g_current_user;

var g_url_serviceBase = "http://localhost:8800";
var g_url_xmlEditor = g_url_serviceBase +"index.html";
var g_floatMenuArry = [];
var g_viewFloatMenu = null;
var globals={};
//2016.10.13 浮动菜单  tangchenbing
globals.g_url_getFloatMenuConfig = g_url_serviceBase + 'Services/view/getFloatMenuByOid?';



globals.g_url_login = g_url_serviceBase + 'Services/principal/login?';
globals.g_url_logout = g_url_serviceBase + 'Services/principal/logout?';
globals.g_url_getLoginUser = g_url_serviceBase + 'Services/principal/getLoginUser?';
globals.g_url_queryAssignments = g_url_serviceBase + 'Services/workflow/queryAssignments?';
globals.g_url_queryMyTasks = g_url_serviceBase + 'Services/workflow/queryMyTasks?';
globals.g_url_queryMyTasksNumber = g_url_serviceBase + 'Services/workflow/queryMyTasksNumber';
globals.g_url_getOriginateAssignment = g_url_serviceBase + 'Services/workflow/getOriginateAssignment';
globals.g_url_queryMyTasksShowHomepage = g_url_serviceBase + 'Services/workflow/queryMyTasksShowHomepage';
globals.g_url_completeAssignment = g_url_serviceBase + 'Services/workflow/completeAssignment?';
globals.g_url_batchCompleteAssignment = g_url_serviceBase + 'Services/workflow/batchCompleteAssignment?';

globals.g_url_checkTaskRoles = g_url_serviceBase + 'Services/workflow/checkTaskRoles?';

globals.g_url_queryDocInfo = g_url_serviceBase + 'Services/doc/getDoc?';
globals.g_url_updateDocInfo = g_url_serviceBase + 'Services/doc/updateDoc';
globals.g_url_queryObjectInfo = g_url_serviceBase + 'Services/persist/getObject?';
globals.g_url_getToolButtonList = g_url_serviceBase+'Services/uf/getToolButtonList';

globals.g_url_listReleatedDocs = g_url_serviceBase + 'Services/doc/listReleatedDocs?';
globals.g_url_addReleatedDocs = g_url_serviceBase + 'Services/doc/addReleatedDocs?';
globals.g_url_deleteReleatedDocs = g_url_serviceBase + 'Services/doc/deleteReleatedDocs?';

globals.g_url_queryUsers = g_url_serviceBase + 'Services/principal/queryUsers?';
globals.g_url_listUsers = g_url_serviceBase + 'Services/principal/listUsers?';
globals.g_url_queryUsersByDocid = g_url_serviceBase + 'Services/principal/queryUsersByDocid?';
globals.g_url_queryGroupUsersAndGroups=g_url_serviceBase+'Services/principal/queryGroupUsersAndGroups?';
//globals.g_url_queryRoles = g_url_serviceBase + 'Services/principal/queryRoles?';
globals.g_url_addUserToRole = g_url_serviceBase + 'Services/principal/addUserToRole?';
globals.g_url_addUserToRoles = g_url_serviceBase + 'Services//principal/addUserToRoles?';
globals.g_url_removeUserToRole = g_url_serviceBase + 'Services/principal/removeUserToRole?';
globals.g_url_removeTasksRole = g_url_serviceBase + 'Services/principal/removeTasksRole?';

globals.g_url_listSysLogRecord=g_url_serviceBase+'Services/sysLog/listSysLogRecord';

globals.g_url_selectFileTree = g_url_serviceBase +"Services/folder/selectFileTree";
globals.g_url_selectFileInIme = g_url_serviceBase +"Services/folder/listFolderFiles?";
globals.g_url_searchMapFiles = g_url_serviceBase+'Services/folder/searchMapFiles';
globals.g_url_getIMEChartMapPath=g_url_serviceBase+'Services/doc/chartMap?';
globals.g_url_newFolder=g_url_serviceBase+'Services/folder/newFolder?';
globals.g_url_updateFolder=g_url_serviceBase+'Services/folder/updateFolder?';
globals.g_url_newFile=g_url_serviceBase+'Services/folder/newFile';
globals.g_url_removeFiles=g_url_serviceBase+'Services/folder/removeDocs?';
globals.g_url_removeFolder=g_url_serviceBase+'Services/folder/removeFolder?';
globals.g_url_copyContainerStruct=g_url_serviceBase+'Services/folder/copyContainerStruct?';

globals.g_url_softtypeList=g_url_serviceBase+'Services/filedoc/getSofttypeList?';
globals.g_url_FilesofttypeList=g_url_serviceBase+'Services/filedoc/getFileSofttypeList?';
globals.g_url_softtypeInfo=g_url_serviceBase+'Services/filedoc/getSofttypeInfo?';
globals.g_url_softtypeInfoByList=g_url_serviceBase+'Services/filedoc/getSofttypeInfoByList?';
globals.g_url_saveDoc=g_url_serviceBase+'Services/filedoc/saveDoc?';
globals.g_url_saveZip=g_url_serviceBase+'Services/filedoc/saveZip?';
globals.g_url_uploadsofttype=g_url_serviceBase+'Services/filedoc/getuploadsofttype';
globals.g_url_readsofttype=g_url_serviceBase+'Services/filedoc/getreadsofttype';
globals.g_url_updateDoc=g_url_serviceBase+'Services/filedoc/updateDoc?';
globals.g_url_saveSearchTemplate = g_url_serviceBase+'Services/query/saveSearchTemplate';
globals.g_url_templateList = g_url_serviceBase+'Services/query/listSearchTemplate';

globals.g_url_saveAs=g_url_serviceBase+'Services/filedoc/saveAs?';
globals.g_url_getStorageSpace=g_url_serviceBase+'Services/editor/getStorageSpace';
globals.g_url_queryWfDefine = g_url_serviceBase + 'Services/workflow/queryWfDefine?';
globals.g_url_validateWfDefine = g_url_serviceBase + 'Services/workflow/validateWfDefine';
globals.g_url_uploadWfDefine = g_url_serviceBase + 'Services/workflow/uploadWfDefine';
globals.g_url_queryProcess = g_url_serviceBase + 'Services/workflow/queryProcess?';
globals.g_url_terminatedProcess = g_url_serviceBase + 'Services/workflow/terminatedProcess?';
globals.g_url_createProcess = g_url_serviceBase + 'Services/workflow/start?';
globals.g_url_queryObjects = g_url_serviceBase + 'Services/workflow/queryObjects?';
globals.g_url_getwfDefine = g_url_serviceBase + 'Services/workflow/getwfDefine?';
globals.g_url_queryProcessesByPboId = g_url_serviceBase + 'Services/workflow/queryProcessesByPboId?';
globals.g_url_queryProcessXml = g_url_serviceBase + 'Services/workflow/queryProcessXml?';
globals.g_url_reAssignment = g_url_serviceBase + 'Services/workflow/reAssignment?';
//xml文件操作

globals.g_url_documentStructureTreeByOid=g_url_serviceBase+'Services/xmldoc/getdocumentStructureTreeByOid';
globals.g_url_getConrefContent = g_url_serviceBase+'Services/xml/getConrefContent';
globals.g_url_saveasByTemplate = g_url_serviceBase+'Services/doc/saveasByTemplate';
globals.g_url_queryDocByIBAS = g_url_serviceBase+'Services/doc/queryDocByIBAS?';
globals.g_url_createBaseLinkByOid = g_url_serviceBase+'Services/xmldoc/createBaseLinkByOid';
globals.g_url_checkIn = g_url_serviceBase + 'Services/filedoc/checkin?';
globals.g_url_checkOut = g_url_serviceBase + 'Services/filedoc/checkout?';

globals.g_url_compareBaseline = g_url_serviceBase + 'Services/doc/compareBaseLine?';


//站点相关url
globals.g_url_addDomain=g_url_serviceBase+'Services/domain/addDomain';
globals.g_url_removeDomianById=g_url_serviceBase+'Services/domain/removeDomianById';
globals.g_url_getDomainByOid=g_url_serviceBase+'Services/domain/getDomainByOid';
globals.g_url_updateDomain=g_url_serviceBase+'Services/domain/updateDomain';
globals.g_url_getAllDomain=g_url_serviceBase+'Services/domain/getAllDomain';
globals.g_url_setDomainUser=g_url_serviceBase+'Services/domain/setDomainUser';
globals.g_url_getDomainByUser=g_url_serviceBase+'Services/domain/getDomainByUser';
globals.g_url_removeDomainUser=g_url_serviceBase+'Services/domain/removeDomainUser';
globals.g_url_setSessionDomain=g_url_serviceBase+'Services/domain/setSessionDomain';
globals.g_url_getSessionDomain=g_url_serviceBase+'Services/domain/getSessionDomain';
globals.g_url_domainDataIsRepeat=g_url_serviceBase+'Services/domain/domainDataIsRepeat';
globals.g_url_addHomeDocs = g_url_serviceBase + 'Services/homeDoc/addHomeDocs';
globals.g_url_deleteHomeDocs = g_url_serviceBase + 'Services/homeDoc/deleteHomeDocs';
globals.g_url_queryHomeDocs = g_url_serviceBase + 'Services/homeDoc/queryHomeDocs';

//存储空间相关url
globals.g_url_addContainer=g_url_serviceBase+'Services/container/addContainer';
globals.g_url_updateContainer=g_url_serviceBase+'Services/container/updateContainer';
globals.g_url_getContainerByDomain=g_url_serviceBase+'Services/container/getContainerByDomain';
globals.g_url_getContainerByDomainid=g_url_serviceBase+'Services/container/getContainerByDomainid';
globals.g_url_getContainerByDomainAndUser=g_url_serviceBase+'Services/container/getContainerByDomainAndUser';
globals.g_url_getFristContainerByDomainAndUser=g_url_serviceBase+'Services/container/getFristContainerByDomainAndUser';
globals.g_url_getContainerByOid=g_url_serviceBase+'Services/container/getContainerByOid';
globals.g_url_setContainerUser=g_url_serviceBase+'Services/container/setContainerUser';
globals.g_url_removeContainerUser=g_url_serviceBase+'Services/container/removeContainerUser';
globals.g_url_removeDomainContainer=g_url_serviceBase+'Services/container/removeDomainContainer';
globals.g_url_movefile=g_url_serviceBase+'Services/folder/movefile?';
globals.g_url_movefiles=g_url_serviceBase+'Services/folder/movefiles?';
globals.g_service_selectFileTree = g_url_serviceBase+'Services/folder/selectFileTree';
globals.g_url_getNavigationContainers = g_url_serviceBase + '/Services/uf/getNavigationContainers';


//基线
globals.g_url_createBaseLine = g_url_serviceBase + '/Services/doc/createBaseLink?';

globals.g_url_listContainerActions=g_url_serviceBase+'Services/container/listActions?';
//用户相关URL
globals.g_url_getUserByDomian=g_url_serviceBase+'Services/principal/getUserByDomian';
globals.g_url_getUserByContainer=g_url_serviceBase+'Services/principal/getUserByContainer';
globals.g_url_searchUser=g_url_serviceBase+'Services/principal/searchUser';
globals.g_url_searchGroups=g_url_serviceBase+'Services/principal/searchGroups?';
globals.g_url_getPermissionByContainer=g_url_serviceBase +'Services/permission/getPermissionByContainer';
globals.g_url_addPermission=g_url_serviceBase+'Services/permission/addPermission';
globals.g_url_addPermissions=g_url_serviceBase+'Services/permission/addPermissions';
globals.g_url_deletePermission=g_url_serviceBase+'Services/permission/deletePermission';
globals.g_url_deletePermissions=g_url_serviceBase+'Services/permission/deletePermissions';
globals.g_url_updatePermission=g_url_serviceBase+'Services/permission/updatePermission';
globals.g_url_getsofttype = g_url_serviceBase+'Services/permission/getsofttype';
globals.g_url_getsofttypeLifecycle = g_url_serviceBase+'Services/permission/getsofttypeLifecycle';
globals.g_url_getlifecycle = g_url_serviceBase+'Services/permission/getlifecycle';
globals.g_url_getUserGroup = g_url_serviceBase+'Services/principal/getUserGroup?';
globals.g_url_saveUserAndGroup = g_url_serviceBase+'Services/principal/saveUserAndGroup';
globals.g_url_isAdministrator = g_url_serviceBase +'Services/permission/isAdministrator';
globals.g_url_searchPassword=g_url_serviceBase+'Services/principal/searchPassword';
globals.g_url_modifyPassword=g_url_serviceBase+'Services/principal/modifyPassword';
globals.g_url_searchUserImage=g_url_serviceBase+'/Services/principal/searchUserImage';
globals.g_url_shareObject=g_url_serviceBase+'/Services/principal/shareObject';

//组
globals.g_url_showGroupTree=g_url_serviceBase+'Services/principal/showGroupTree';
//globals.g_url_queryGroupTree = g_url_serviceBase + 'Services/principal/loadGroupTree';

globals.g_url_createUser = g_url_serviceBase + 'Services/principal/createUser';
globals.g_url_queryGroupUser = g_url_serviceBase + 'Services/principal/queryGroupUser?';
globals.g_url_queryUsers = g_url_serviceBase + 'Services/principal/queryUsers?';
globals.g_url_createGroup = g_url_serviceBase + 'Services/principal/createGroup';
globals.g_url_saveGroup = g_url_serviceBase + 'Services/principal/saveGroup';
globals.g_url_removeUserFromGroup = g_url_serviceBase + 'Services/principal/removeUserFromGroup?';
globals.g_url_unAssignedGroups = g_url_serviceBase + 'Services/principal/queryNonParentGroups';
globals.g_url_getNonParentGroupsByNameAndId = g_url_serviceBase + 'Services/principal/getNonParentGroupsByNameAndId?';
globals.g_url_deleteGroup = g_url_serviceBase + 'Services/principal/deleteGroup?';
globals.g_url_queryGroupAllUser = g_url_serviceBase + 'Services/principal/queryGroupAllUser?';
globals.g_url_saveUser = g_url_serviceBase + 'Services/principal/saveUser';
globals.g_url_loadUserGroup = g_url_serviceBase + 'Services/principal/loadUserGroup?';
globals.g_url_getLoginUser = g_url_serviceBase + 'Services/principal/getLoginUser';
globals.g_url_login = g_url_serviceBase + 'Services/principal/login';
globals.g_url_queryUsersByGroups = g_url_serviceBase + 'Services/principal/queryUsersByGroups?';
globals.g_url_addUserToRole = g_url_serviceBase + 'Services/principal/addUserToRole?';
globals.g_url_removeUserToRole = g_url_serviceBase + 'Services/principal/removeUserToRole?';
globals.g_url_queryRoles = g_url_serviceBase + 'Services/principal/queryRoles?';
globals.g_url_queryTasksRoles = g_url_serviceBase + 'Services/principal/queryTasksRoles?';

globals.g_url_createMembers=g_url_serviceBase+'Services/principal/createMembers';
globals.g_url_saveMembers=g_url_serviceBase+'Services/principal/saveMembers';
globals.g_url_loadMembers=g_url_serviceBase+'Services/principal/loadMembers?';
globals.g_url_createGroup=g_url_serviceBase+'Services/principal/createGroup?';
globals.g_url_updateGroup=g_url_serviceBase+'Services/principal/updateGroup?';
//图片
globals.g_url_ShowImage=g_url_serviceBase+'jsp/util/binaryContent.jsp?';

globals.g_url_taskinfoPages = g_url_serviceBase + 'Services/workflow/queryTaskPages?';

globals.g_url_affectedDocs = g_url_serviceBase + 'Services/changeactivity/queryAffectedDocs?';
globals.g_url_saveChangeLink = g_url_serviceBase + 'Services/changeactivity/saveChangeLink?';
globals.g_url_queryCheckInTypes = g_url_serviceBase + 'Services/doc/queryCheckInTypes?';

globals.g_url_getWfDefineByOid = g_url_serviceBase + 'Services/workflow/getWfDefineByOid?';
globals.g_url_saveWfDefine = g_url_serviceBase +'Services/workflow/saveWfDefine?';
//数据导入
globals.g_url_uploadUserInfo=g_url_serviceBase+"Services/uploadData/uploadUserInfo";

//队列管理相关
globals.g_url_queues=g_url_serviceBase+"Services/queue/queues";
globals.g_url_queueItems=g_url_serviceBase+"Services/queue/queue/items";


//多语言
globals.g_url_getLang=g_url_serviceBase+'/Services/lang/get';
globals.g_url_getBrowserInfo=g_url_serviceBase+'/Services/lang/getBrowserInfo';
globals.g_langSet = [];

//访问记录
globals.g_url_deleteFavoriteItem = g_url_serviceBase+'/Services/uf/deleteFavoriteItem?';
globals.g_url_getFavoriteItems = g_url_serviceBase+'/Services/uf/getFavoriteItems?';
globals.g_url_getVisitedItems = g_url_serviceBase+'/Services/uf/recentVisted?';
globals.g_url_getCheckoutList = g_url_serviceBase+'/Services/uf/checkoutlist?';
globals.g_url_getUpdatedList = g_url_serviceBase+'/Services/uf/updatedList?';
globals.g_url_getHomePageConfig = g_url_serviceBase+'/Services/uf/homePageConfig?';
globals.g_url_reloadConfig = g_url_serviceBase+'/Services/uf/reloadConfig?';
globals.g_url_getMonitorInfos = g_url_serviceBase+'/Services/monitor/myMonitors?';
globals.g_url_getMonitorStatus = g_url_serviceBase+'/Services/monitor/getStatus?';

//客制化配置
globals.g_url_getSessionDomainAndJsFiles=g_url_serviceBase+'/Services/domain/getSessionDomainAndJsFiles';

//打开操作
globals.g_url_getOpenObjInfo = g_url_serviceBase+'/Services/container/getOpenObjectInfo?';

//系统配置
globals.g_url_listSystemTool = g_url_serviceBase+'/Services/sys/listSystemTools?';
//系统参数
globals.g_url_getSystemParams = g_url_serviceBase+'/Services/sys/getSystemParams?';

//TIS指定存储库文件查询
globals.g_url_tisFolders = g_url_serviceBase+'/Services/export/listFolder?';
globals.g_url_tisTree = g_url_serviceBase+'/Services/export/getTree?';
globals.g_url_exportFile = g_url_serviceBase+'/Services/export/exportFile?';
//品牌车系授权客制化
globals.g_url_tis_listAuthTechDataCar = g_url_serviceBase+"/Services/authTechData/listAuthTechDataCar";
globals.g_url_tis_listCurCarlineAuthUser = g_url_serviceBase+"/Services/authTechData/listCurCarlineAuthUser";
globals.g_url_tis_listBrandSocialUser = g_url_serviceBase+"/Services/authTechData/listBrandSocialUser";
globals.g_url_tis_authUserToCarLine = g_url_serviceBase+"/Services/authTechData/authUserToCarLine";
globals.g_url_tis_getAuthTimeLength = g_url_serviceBase+"/Services/authTechData/getAuthTimeLength";
globals.g_url_tis_getExtUserAttributes = g_url_serviceBase+"/Services/principal/getExtUserAttributes";

//翻译
globals.g_url_getTranslationLangs =  g_url_serviceBase+"Services/translate/loadTranslationLangs";
globals.g_url_updateTranslationLangs = g_url_serviceBase + "Services/translate/updateTranslateInfos";
globals.g_url_deleteTranslateLangs = g_url_serviceBase + "Services/translate/deleteTranslateLangs";

// 防止html缓存以及当前Domain与Cookies里的Domain不一致。
globals.g_url_check_user = g_url_serviceBase+'/Services/principal/checkUser';
globals.g_url_check_domain = g_url_serviceBase+'/Services/principal/checkDomain?curDomain=';

module.exports=globals;


