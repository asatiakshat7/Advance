const User = require('../models/user');
const fs=require('fs');
const path=require('path');

// module.exports.profile = async function (req, res) {
//     let user = await User.findById(req.params.id);

//     return res.render('user_profile', {
//         title: 'User Profile',
//         profile_user: user
//     });

// }


module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        })
    })

 }

//update in user profile
module.exports.update=async function(req,res){
    // try{
    //     if (req.user.id == req.params.id){
    //         await User.findByIdAndUpdate(req.params.id, req.body);
    //         return res.redirect('back');
    //     }else {
    //                 return res.status(401).send('UnAuthorised');
    //             }
    // }catch(err){
    //     console.log('Error',err);
    //     return ;
    // }
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*** Multer Error',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    console.log(req.file);
                    //this we are using for saving file path
                    user.avatar=User.avatharPath+'/'+req.file.filename;
                }
                user.save();
                console.log(req.file);
                return res.redirect('back');
            })
        }catch(err){
            console.log('Error',err);
            return ;
        }
    }else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}
    

// module.exports.update = function (req, res) {
//     if (req.user.id == req.params.id) {

//         User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
//             console.log(req.body.name);
//             console.log(req.body.email);
//             return res.redirect('back');
//         })
//     } else {
//         return res.status(401).send('UnAuthorised');
//     }
// }

// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render forgot password

module.exports.forgot=function(req,res){
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_forgotpassword',{
        title:"Forgot password"
    });
}

// changing Password
module.exports.newpassword=function(req,res){
    
}
// render the sign in page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return }

                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success','Logged in Successfully');
    console.log('Success');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success','Logged out Successfully');
    console.log('Log out');
    return res.redirect('/');
}