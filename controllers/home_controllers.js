const Post = require('../models/post');

module.exports.home = function(req,res){
    
    
    // Post.find({user:req.user._id}, function(err,posts){
    //     return res.render('home',{
    //         title:"Home",
    //         posts:posts
    //     })
    // })

    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title:"Home",
            posts:posts
        })
    })
    
};