const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/posts_controllers');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,postsControllers.create);
router.get('/destroy/:id', passport.checkAuthentication, postsControllers.destroy)
module.exports = router;