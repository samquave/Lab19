let express = require('express');
var auth = require('../middleware/auth.mw');
let procedures = require('../procedures/users.proc');
var passport = require('passport');


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

router.get('/me', function (req, res) {
    res.send(req.user);
})

router.get('/', auth.isLoggedIn, function (req, res) {
    procedures.all()
        .then(function (users) {
            res.send(users);
        }, function (err) {
            res.status(500).send(err);
        });
});

router.get('/:id', function (req, res) {
    procedures.read(req.params.id)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.status(500).send(err);
        });
});

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.sendStatus(204);
    })
})

module.exports = router;

