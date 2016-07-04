var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Post = require('../models/post.js');

/* GET posts listing. */
//router.post('/post',checkLogin);
router.post('/post',function(req,res){
    var currentUser = {name: "wenzhen", password: "123456"};
    //var currentUser = req.session.user;
    var post = new Post(currentUser.name,req.body.post);
    post.save(function(err){
        if(err){
            res.json({msg:'保存失败',detail:err});
        }
        //res.json({code:0,msg:'发表成功'});
        res.redirect('/user/'+currentUser.name);
    });
});
function checkLogin(req,res,next){
    if(!req.session.user){
       return res.redirect('/login');
    }
    next();
}
function checkNotLogin(req,res,next){
    if(req.session.user){
        return res.redirect('/');
    }
}
module.exports = router;