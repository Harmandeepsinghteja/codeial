const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user')


module.exports.create = async function(req,res){
    try{
        let post =  await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        let newPost =   Post.findById(post.id).populate('user','name').exec(function (err, post) {
            if (err) return handleError(err);
            
            if(req.xhr){
            
                console.log(post.user.name)
                return  res.status(200).json({
                    data:{
                        post:post
                    },
                    message:"Post created!"
                });
            }
          });
        
         
                
          
       
        
        req.flash('success','Post Published!');
    // return res.redirect('back');

    }
    catch(err){
        req.flash('error',err);
        console.log('Error', err);
        return res.redirect('back');

    }
    
}


module.exports.destroy =async function(req,res){
    try{
        let post = await Post.findById(req.params.id)
        
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id})
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id,
                    },
                    message:"Post deleted"
                })
            }

            req.flash('success','Post Deleted!');

            return res.redirect('back');
        }
        else{
            res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err);
        console.log('Error', err);

    }
};