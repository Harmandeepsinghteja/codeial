const Comment = require('../models/comment');
const Post = require('../models/post')



module.exports.create =async function(req,res){
    try{
    
    let post = await Post.findById(req.body.post)
    if(post){
        let comment =  await Comment.create({
            content: req.body.commentContent,
            user: req.user._id,
            post: req.body.post
        } );
        // Updating the comments in Post Array
        post.comments.push(comment);
        post.save();
        return res.redirect('back');
    }
}

}


module.exports.destroy = async function(req,res){
    try {
        let comment = Comment.findById(req.params.id);
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
}
catch(err){
    console.log('Error', err);
    return;

}
}
