const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email,password,done){
    // find the user and establish the identity
    User.findOne({email:email}, function(err,user){
        if(err){
            console.log("Error in finding the user --> Passport");
            return done(err);
        }
        if(!user || user.password!=password){
            console.log("Invalid Username/Password");
            return done(null,false);
        }

        if(user){
            return done(null,user);
        }
    })
}
) );

// Serializing the user to decide whcich key is to be kept in the cookiies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


// Deseralizing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding the user --> Passport");
            return done(err);
        }
        return done(null, user);
    });
});

module.exports = password;

