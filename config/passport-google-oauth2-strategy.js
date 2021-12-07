const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cryto = require('crypto');

const User = require('../models/user');


passport.use(new googleStrategy({
        clientID: "59976620273-ng82o98pisv72ik18mqtjt4f3g6pa777.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
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