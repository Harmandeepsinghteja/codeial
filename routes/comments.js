const express = require('express');
const router = express.Router();
const commentsControllers = require('../controllers/comments_controllers');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,commentsControllers.create);

module.exports = router;