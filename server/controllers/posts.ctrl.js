let express = require('express');
let procedures = require('../procedures/posts.proc')

let router = express.Router();

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
        procedures.create(req.body.title, req.body.userid, req.body.categoryid, req.body.content).then(
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
        procedures.update(req.params.id, req.body.content).then(
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