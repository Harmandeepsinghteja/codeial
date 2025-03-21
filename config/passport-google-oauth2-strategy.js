const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cryto = require('crypto');
const env = require('./environment');
const User = require('../models/user');


passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret:env.google_client_secret,
        callbackURL:env.google_callback_url
    },
    function(accessToken, refreshToken,profile,done ){
        User.findOne({email:profile.emails[0].value }).exec(function(err,user){
            if(err){
                console.log("Error in google strategy passport", err)
                return;
            }
            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log("Error in creating user using google strategy passport", err)
                        return;
                    }
                    if(user){
                        return done(null,user);
                }
                
            }
                )
        }
    }

        )
    }

));

module.exports = passport;