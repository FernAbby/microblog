var setting = require('../settings');
var db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var server = require('mongodb').Server;

// module.exports = new db(setting.db,new server(setting.host,Connection.DEFAULT_PORT,{}));
module.exports = new db(setting.db,new server(setting.host,27017,{}));