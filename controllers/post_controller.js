const Post = require('../models/post');
const comment = require('../models/comment');
const Likes = require('../models/likes');

// module.exports.create=function(req,res){
//     post.create({
//         content:req.body.content,
//         user:req.user._id
//     },function(err,post){
//         if(err){
//             console.log('Error in creating Post');
//             return;
//         }
//         return res.redirect('/');
//     })
// }

module.exports.create = async function (req, res) {
    try {
       let post=await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post Created"
            });
        }
        req.flash('success','Post public');
        return res.redirect('/');
    } catch (err) {
        req.flash('error',err);
        console.log('Error', err);
        return;
    }

}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            await Likes.deleteMany({likeable: post,onModel:'Post'});
            await Likes.deleteMany({_id:{$in:post.comments}});

            post.remove();

            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
    return res.status(200).json({
        data:{
            post_id:req.params.id
        },
        message:"Post Deleted"
    });
}
            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}

// if(req.xhr){
//     return res.status(200).json({
//         data:{
//             post_id:req.params.id
//         },
//         message:"Post Deleted"
//     });
// }
// module.exports.destroy=function(req,res){
//     post.findById(req.params.id,function(err,post){
//         if(err){
//             console.log('Error in Deleting post');
//             return;
//         }
//         if(post.user==req.user.id){
//             post.remove();
//             comment.deleteMany({post: req.params.id},function(err){
//                 return res.redirect('back');
//             })

//         }else{
//             return res.redirect('back');
//         }
//     })
// }

// module.exports.update=function(req,res){
//     post.find({
//         user:req.user._id
//     },function(err,post){
//         if(err){
//             console.log('Error in Updating Post');
//             return;
//         }

//         return res.redirect('/',);
//     })
// }
