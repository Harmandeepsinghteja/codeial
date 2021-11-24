const Post = require('../models/post');
const User = require('../models/user')
module.exports.home =async function(req,res){
    
    
    // Post.find({user:req.user._id}, function(err,posts){
    //     return res.render('home',{
    //         title:"Home",
    //         posts:posts
    //     })
    // })
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path:'user'
        }
    });
    
    

let users = await User.find({})


return res.render('home',{
    title:"Home",
    posts:posts,
    all_users: users
})

    }
    catch(err) {
        console.log('Error', err);
    }
    

};
