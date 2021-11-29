const { request } = require('express');
const User = require('../models/user');



module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        res.render('users_profile',{
            title:"User Profile",
            profile_user: user
        })
    } )
    
};

module.exports.update =async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         return res.redirect('back');
    //     }) }
    //     else{
    //         return res.status(401).send('Unauthorized');
    //     }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('****Multer Erro',err);
                    
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    // saving the path pf the upload file into the avatar field in the user
                    user.avatar = User.avatarPath +'/' +req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
    
}

// Render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
};

// Render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req,res){
    if (req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}, function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                console.log('Error in creating  user while signing up');
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
    
}

// get the sign in page
module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

// sign out
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success', 'You have Logged out!');
    
    return res.redirect('/');
}