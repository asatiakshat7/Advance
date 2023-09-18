// const Comment = require('../models/comment');
// const Post = require('../models/post');

// module.exports.create = function(req, res){
//     Post.findById(req.body.post, function(err, post){

//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 // handle error
//                 if(err){
//                     console.log('err');
//                     return ;
//                 }
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('/');
//             });
//         }

//     });
// }

// // destroy comments
// module.exports.destroy=function(req,res){
//     Comment.findById(req.params.id,function(err,Comments){
//         if(Comments.user==req.user.id){
//             let postId=Comments.post;
//             Comments.remove();
//             Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,p){
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     })
// }

// // destroy comments by user
const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user','name email');
            // comment = await comment.populate('user', 'name email').exec();
            console.log(comment);
            commentsMailer.newComment(comment);

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_content:comment
                    },
                    message:"Comment"
                });
            }
          req.flash('success', 'Comment is add');
            res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();
        
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            await Likes.deleteMany({likeable: comment._id,onModel:'Comment'});
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"Comment Deleted"
                });
            }

            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}
