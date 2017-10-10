let express = require('express');
let posts = require('./controllers/posts.ctrl');
let users = require('./controllers/users.ctrl');
let categories = require('./controllers/categories.ctrl');

let router = express.Router();

router.use('/posts', posts);
router.use('/users', users);
router.use('/categories', categories);

module.exports = router;