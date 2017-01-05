/**
 * Created by FernAbby on 17/1/4.
 */
var express = require('express');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './public/upload'});
var router = express.Router();

/* GET users listing. */
router.get('/exams', function(req, res, next) {
    res.render('exams/list',{
        title: '列表页面',
    });
});
router.get('/exams/upload', function(req, res, next) {
    res.render('exams/upload',{
        title: '图片上传案例',
    });
});
router.post('/exams/upload', multipartMiddleware, function(req,res){
    console.log(req.files);
    console.log(req.body);
    res.send(req.body);
});
module.exports = router;