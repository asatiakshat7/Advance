const Post = require("../models/post");
const User = require("../models/user");
const user=require("../models/user");
// module.exports.home = function(req, res){
//     console.log(req.cookies);
//     res.cookie('user_id', 25);
//     return res.render('home', {
//         title: "Home"
//     });
// }

// module.exports.home=function(req,res){
//     Post.find({}).populate('user').populate({path:'comments',populate:{path:'user'}}).exec(function(err,posts){
//         // for(post of posts){
//         //     for(comment of post.comments){
//         //         console.log(comment);
//         //     }
//         // }
//         User.find({},function(err,users){
//             return res.render('home', {
//                 title: "Home",
//                 Post:posts,
//                 all_users:users
//             });
//         });
//     })
// }
// module.exports.actionName = function(req, res){}

module.exports.home=async function(req,res){
    try{
        let posts=await Post.find({}).sort('-createdAt ').populate('user').populate({path:'comments',populate:{path:'user'},populate:{path:'likes'}}).populate('likes');
        let users=await User.find({});
        return res.render('home', {
            title: "Home",
            Post:posts,
            all_users:users
        });
    }catch(err){
        console.log("Error",err);
    }
}