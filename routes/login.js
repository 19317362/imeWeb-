var express = require('express');
var router = express.Router();


/* GET home page. */

router.get('/imeWeb/login.html',function(req, res,next){
    res.render('login')
})

router.post('/Services/principal/login',function(req, res,next){
    if(req.body.userId=='hurong'&&req.body.password=='hr'){
       return res.json({success:true})
    }
    return redirect('back')
})

module.exports = router;
