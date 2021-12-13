const nodeMailer = require('../config/nodemailer');



// This is another way of exporting method
exports.newComment = (comment) => {
    console.log('inside new comment mailer');
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comment/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: '',
        to:comment.user.mail,
        subject:"New Comment Published",
        html:htmlString
    },(err,info) =>{
        if(err){
            console.log("error in sending the mail,",err);
            return;
        }
        console.log("Message Sent");
    } );
}