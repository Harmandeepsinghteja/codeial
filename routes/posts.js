const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/posts_controllers');


router.post('/create',postsControllers.create);

module.exports = router;