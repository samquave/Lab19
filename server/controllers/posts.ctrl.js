let express = require('express');
let procedures = require('../procedures/posts.proc')
var passport = require('passport');
var auth = require('../middleware/auth.mw');

let router = express.Router();

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.sendStatus(500);
            }
            else {
                return res.send(user);
            }
        });
    })(req, res, next)
});

// router.all('*', auth.isLoggedIn);

router.route('/')
    .get((req, res) => {
        procedures.all().then(
            success => {
                res.send(success);
            },
            err => {
                console.log(err);
                res.sendStatus(500);
            }
        );
    })
    .post((req, res) => {
        procedures.create(req.body.content, req.body.userid, req.body.categoryid, req.body.title).then(
            success => {
                res.send(success);
            },
            err => {
                console.log(err);
                res.sendStatus(500);
            }
        );
    });
router.route('/:id')
    .get((req, res) => {
        procedures.read(req.params.id).then(
            success => {
                res.send(success);
            },
            err => {
                console.log(err);
                res.sendStatus(500);
            }
        );
    })
    .put((req, res) => {
        procedures.update(req.params.id, req.body.id, req.body.content, req.body.categoryid, req.body.title).then(
            success => {
                res.send(success);
            },
            err => {
                console.log(err);
                res.sendStatus(500);
            }
        );
    })
    .delete(( req, res) => {
        procedures.destroy(req.params.id).then(
            success => {
                res.send(success);
            },
            err => {
                console.log(err);
                res.sendStatus(500);
            }
        );
    });

module.exports = router;