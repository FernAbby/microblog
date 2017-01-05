/**
 * Created by changetech on 16/5/17.
 */
    module.exports = function(app){
        var books = require('./books');
        var index = require('./index');
        var user = require('./user');
        var post = require('./post');
        var exams = require('./exams');
        app.use(books);
        app.use(index);
        app.use(user);
        app.use(post);
        app.use(exams);
    }
