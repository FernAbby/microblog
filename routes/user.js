var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Post = require('../models/post.js');

/* GET users listing. */
router.get('/user/:username',function(req,res){
	User.get(req.params.username,function(err,user){
		console.log(user);
		if(!user) {
			res.json({msg: '用户不存在'});
			return;
		}
		Post.get(user.name,function(err,posts){
			console.log(posts);
			if(err){
				return res.json({msg:'用户查询失败',detail:err});
			}
			res.render('user',{
				title: '个人中心',
				user: user,
				posts: posts
			});
		});
	});
});
//当你访问任何被这两条同样的规则匹配到的路径时,会发现请求总是被前一条路由规则捕获,后面的规则会被忽略。原因是Express在处理路由规则时,会优先匹配先定义的路由规则,因此后面项同的规则被屏蔽。
// router.all('/:username', function(req, res, next) { 
// 	res.send('all methods captured');
// });

// router.get('/:username',function(req,res,next){
// 	res.render('user',{title: 'Express',username:req.params.username});
// });
//router.all('/user/:username', function(req, res, next) {
////检查用户是否存在
//if (users[req.params.username]) {
//	next();
//} else {
//	next(new Error(req.params.username + ' does not exist.')); }
//});
//router.get('/user/:username', function(req, res) {
//	//用户一直存在，直接展示
//	res.send(JSON.stringify(users[req.params.username]));
//});
//router.put('/user/:username', function(req, res) { //
//	res.send('Done');
//});

module.exports = router;
