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

// check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is sign in , then pass on the request to the function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not sign in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contain the current signed in user from the session cookie and we just sending this to locals for the views
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;

