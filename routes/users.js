const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersControllers = require('../controllers/users_controllers')
;
router.get('/profile/:id',passport.checkAuthentication, usersControllers.profile)
router.post('/update/:id',passport.checkAuthentication, usersControllers.update)

router.get('/sign-up', usersControllers.signUp);
router.get('/sign-in',usersControllers.signIn);
router.post('/create',usersControllers.create);
// use passsport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersControllers.createSession);
router.get('/sign-out',usersControllers.destroySession);


router.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),usersControllers.createSession);

module.exports = router;

