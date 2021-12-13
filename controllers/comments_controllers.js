const Comment = require('../models/comment');
const Post = require('../models/post')
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

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
        comment = await comment.populate('user','name email');
        // commentsMailer.newComment(comment);
        let job = queue.create('emails', comment).save(function(err){
            if(err){
                console.log("error in creating the queue");
            }
            console.log(job.id);
        });
        return res.redirect('back');
    }
}
catch(err){
    console.log('Error', err);
    return;

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
