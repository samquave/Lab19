let express = require('express');
let procedures = require('../procedures/categories.proc');

let router = express.Router();
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