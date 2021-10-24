module.exports.profile = function(req,res){
    res.render('users_profile',{
        title:"Users"
    })
};

// Render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
};

// Render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req,res){
    // TODO
}

// get the sign in page
module.exports.createSession = function(req,res){
    // TODO
}