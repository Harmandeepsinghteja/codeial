const Comment = require('../models/comment');
const Post = require('../models/post')



module.exports.create = function(req,res){
    
    Post.findById(req.body.post, function(err,post){
        if(post){
            Comment.create({
                content: req.body.commentContent,
                user: req.user._id,
                post: req.body.post
            }, function(err,comment){
                if(err){
                    console.log("Error in creating the Post");
                }
                // Updating the comments in Post Array
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            } )
        }
    })
}


module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, {$pull: {comments:req.params.id}}, function(err,post){
                return res.redirect('back');
            });
            
        }
        else{
            res.redirect('back');
        }
    })
}
