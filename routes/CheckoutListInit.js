var express = require('express');
var router = express.Router();

var globals=require('../lib/global')
/* GET home page. */

var data=[{"fileType":"Map","days":37,"nameNumber":"test by dj|~|DM038276","oid":"com.imecms.doc.XMLDocument:40123","name":"test by dj","number":"DM038276"},{"fileType":"trans","days":37,"nameNumber":"test by dj|~|DM038276","oid":"com.imecms.doc.XMLDocument:40123","name":"test by dj","number":"DM038276"},{"fileType":"ChangeActivity","days":37,"nameNumber":"test by dj|~|DM038276","oid":"com.imecms.doc.XMLDocument:40123","name":"test by dj","number":"DM038276"},{"fileType":"HTML_PDF","days":37,"nameNumber":"test by dj|~|DM038276","oid":"com.imecms.doc.XMLDocument:40123","name":"test by dj","number":"DM038276"},{"fileType":"XML","days":57,"nameNumber":"DITA Open Toolkit release management|~|DTO036855","oid":"com.imecms.doc.XMLDocument:40134","name":"DITA Open Toolkit release management","number":"DTO036855"},{"fileType":"XML","days":57,"nameNumber":"DITA Open Toolkit release management|~|DTO036855","oid":"com.imecms.doc.XMLDocument:40134","name":"DITA Open Toolkit release management","number":"DTO036855"},{"fileType":"XML","days":57,"nameNumber":"DITA Open Toolkit release management|~|DTO036855","oid":"com.imecms.doc.XMLDocument:40134","name":"DITA Open Toolkit release management","number":"DTO036855"},{"fileType":"XML","days":57,"nameNumber":"DITA Open Toolkit release management|~|DTO036855","oid":"com.imecms.doc.XMLDocument:40134","name":"DITA Open Toolkit release management","number":"DTO036855"},{"fileType":"XML","days":57,"nameNumber":"DITA Open Toolkit release management|~|DTO036855","oid":"com.imecms.doc.XMLDocument:40134","name":"DITA Open Toolkit release management","number":"DTO036855"},{"fileType":"XML","days":57,"nameNumber":"DITA Open Toolkit release management|~|DTO036855","oid":"com.imecms.doc.XMLDocument:40134","name":"DITA Open Toolkit release management","number":"DTO036855"}]


router.get('/Services/uf/checkoutlist',function(req, res){
    res.json(data)
})



module.exports = router;
