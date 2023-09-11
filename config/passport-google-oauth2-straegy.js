const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
       clientID: "275193763377-58g3kb5evbskqr356kg6iv3ogne992pt.apps.googleusercontent.com",
   clientSecret: "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",
   callbackURL:"http://localhost:8000/users/auth/google/callback",
      scope: ['profile', 'email']
},

function(accessToken, refreshToken, profile, done){
    // find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if (err){console.log('error in google strategy-passport', err); return;}
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user){
            // if found, set this user as req.user
            return done(null, user);
        }else{
            // if not found, create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if (err){console.log('error in creating user google strategy-passport', err); return;}

                return done(null, user);
            });
        }

    }); 
}


));


module.exports = passport;


// passport.use(new googleStrategy({
//     clientID: "275193763377-58g3kb5evbskqr356kg6iv3ogne992pt.apps.googleusercontent.com",
//      clientSecret: "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",
//      google_callbackURL: "http://localhost:8000/users/auth/google/callback",

// function(accessToken, refreshToken, profile, done){
//     // find a user
//     User.findOne({email: profile.emails[0].value}).exec(function(err, user){
//         if (err){console.log('error in google strategy-passport', err); return;}
//         console.log(accessToken, refreshToken);
//         console.log(profile);

//         if (user){
//             // if found, set this user as req.user
//             return done(null, user);
//         }else{
//             // if not found, create the user and set it as req.user
//             User.create({
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 password: crypto.randomBytes(20).toString('hex')
//             }, function(err, user){
//                 if (err){console.log('error in creating user google strategy-passport', err); return;}

//                 return done(null, user);
//             });
//         }

//     }); 
// }


// ));


// module.exports = passport;


// passport.use(new googleStrategy({
//     clientID:    env.google_clientID,
//     clientSecret: env.google_clientSecret,
//     callbackURL: env.google_callbackURL,
//   },
//   function( accessToken, refreshToken, profile, done) {
//     User.findOne({ email: profile.email[0].value }).exec(function(err,user){
//         if(err){
//             console.log('Error in googleStrategy');
//             return;
//         }
//         console.log(accessToken, refreshToken);
//         console.log(profile);
//         if(user){
//             return done(null,user);
//         }else{
//             user.create({name:profile.displayName,
//                 email:profile.emails[0].value,
//                 password:crypto.randomBytes(20).toString('hex')
//             },function(err,user){
//                 if(err){
//                     console.log('Error in showing detail');
//                     return;
//                 }
//                 return done(null,user);
//             })
//         } 
//     });
//   }
// ));


// module.exports=passport;