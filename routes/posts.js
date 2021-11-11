const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/posts_controllers');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,postsControllers.create);

module.exports = router;