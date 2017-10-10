let db = require('../config/db');


exports.all = function() {
    return db.rows('GetAllPosts');
}

exports.read = function(id) {
    return db.row('GetSinglePost');
}

exports.update = function(id, content) {
    return db.empty('UpdatePost', [id, content]);
}

exports.destroy = function(id) {
    return db.empty('DeletePost', [id]);
}

exports.create = function(content, userid) {
    return db.row('InsertPost', [content, userid]);
}