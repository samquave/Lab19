var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'blogger',
    password: 'blogpass',
    database: 'AngularBlog'

});

var clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));

app.use(bodyParser.json());

app
    .route('api/posts')
    .get(function (req, res) {
        rows('GetAllPosts')
            .then(function (posts) {
                res.send(posts);
            })
            .catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })
    .post(function (req, res) {
        row('InsertPost', [req.body.content, req.body.userid, req.body.categoryid])
            .then(function (id) {
                res.status(201).send(id);
            })
            .catch(function (err) {
                console.log(err);
                res.sendStatus(500);

            })
    })

    .route('/api/posts/:id')
    .get(function (req, res) {
        row('GetSinglePost', [req.params.id])
            .then(function (post) {
                res.send(post);
            })
            .catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })
    .put(function (req, res) {
        empty('UpdatePost', [req.params.id, req.body.content])
            .then(function () {
                res.sendStatus(204);
            })
            .catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })
    .delete(function (req, res) {
        empty('DeletePost', [req.params.id])
            .then(function () {
                res.sendStatus(204);
            })
            .catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })

    .route('/api/users')
    .get(function (req, res) {
        rows('GetUsers')
            .then(function (users) {
                res.send(users);
            })
            .catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })

    .route('/api/categories')
    .get(function (req, res) {
        rows('GetCategories')
            .then(function (categories) {
                res.send(categories);
            })
            .catch(function (err) {
                console.log(err);
                res.sendStatus(500);
            })
    })


app.listen(3000);

function callProcedure(procedureName, args) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                var placeholders = "";
                if (args && args.length > 0) {
                    for (var i = 0; i < args.length; i++) {
                        if (i === args.length - 1) {
                            placeholders += "?";
                        } else {
                            placeholders += "?,";
                        }
                    }
                }
                var callString = "CALL " + procedureName + "(" + placeholders + ");";
                connection.query(callString, args, function (err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}

function rows(procedureName, args) {
    return callProcedure(procedureName, args).then(function (resultsets) {
        return resultsets[0];
    });
}

function row(procedureName, args) {
    return callProcedure(procedureName, args).then(function (resultsets) {
        return resultsets[0][0];
    });
}

function empty(procedureName, args) {
    return callProcedure(procedureName, args).then(function () {
        return;
    });
}