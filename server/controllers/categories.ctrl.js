let express = require('express');
let procedures = require('../procedures/categories.proc');
var auth = require('../middleware/auth.mw');
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


router.route('/')
.get((req, res) => {
    procedures.all()
    .then((success) => {
        res.send(success)
    }, (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

module.exports = router;