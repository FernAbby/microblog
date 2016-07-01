var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var User = require('../models/user.js');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: '首页' });
});
router.get('/reg',function(req, res, next){
	res.render('reg',{title: '用户注册'});
});
router.post('/reg',function(req, res, next){
	if(req.body['passwordRepeat'] != req.body['password']){
		req.flash('error',{name:'error',message:'两次输入的口令不一致'});
		return res.redirect('/reg');
	}
	var newUser = new User({
		name: req.body.username,
		password: req.body.password
	});
	User.get(newUser.name,function(err,user){
		if(user){
			err = {name:'error',message:'用户名已被使用'};
		}
		if(err){
			req.flash('error', err);
			console.log(err);
			return res.redirect('/reg');
		}
		newUser.save(function(err){
			if (err) {
				console.log(err);
				req.flash('error', err);
				return res.redirect('/reg');
			}
			req.session.user = newUser;
			req.flash('success', {name:'success',message:'注册成功'});
			res.redirect('/');
		});
	});
});
router.get('/login',function(req, res, next){
	res.render('login',{title: '用户登录'});
});
router.post('/login',function(req, res, next){
	User.get(req.body.username,function(err,user){
		if(!user){
			req.flash('error',{name:'error',message:'用户不存在'});
			return res.redirect('/login');
		}
		if(user.password != req.body.password){
			req.flash('error',{name:'error',message:'用户口令错误'});
			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success',{name:'success',message:'登录成功'});
		res.redirect('/');
	});
});
router.get('logout',function(req,res){
	req.session.user = null;
	req.flash('success',{name:'success',message:'注销成功'});
	res.redirect('/');
});
router.get('/test',function(req,res){
	res.render('ajaxJS',{title:'测试ajax'});
});
router.post('/test',function(req,res){
	console.log(req.body);
	res.json({
		id: '007',
		content: '我从全世界路过啊',
		imgs: ['/images/1.png','/images/2.png'],
	});
});
module.exports = router;
