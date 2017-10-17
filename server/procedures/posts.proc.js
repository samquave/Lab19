let db = require('../config/db');


exports.all = function () {
    return db.rows('GetAllPosts');
}

exports.read = function (id) {
    return db.row('GetSinglePost', [id]);
}

exports.update = function (id, content, categoryid, title) {
    return db.empty('UpdatePost', (id, content, categoryid, title));
}

exports.destroy = function (id) {
    return db.empty('DeletePost', [id]);
}

exports.create = function (content, userid, categoryid, title) {
    return db.rows('InsertPost', [content, userid, categoryid, title]);
}