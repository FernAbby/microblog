var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/books', function(req, res, next) {
	res.render('books',{
		title: '列表页面',
		items: [{
		name: '象征与梦境',
		desc: '象征与梦境象征与梦境象征与梦境象征与梦境象征与梦境',
			// img: '/images/002.jpg'
		},{
			name: '宋家客厅',
			desc: '从钱钟书到张爱玲',
			// img: '/images/003.jpg'
		},{
			name: '一个脑残的自我修养',
			desc: '我不知道该如何像正常人那样生活',
			// img: '/images/001.jpg'
		}],
	});
});
module.exports = router;