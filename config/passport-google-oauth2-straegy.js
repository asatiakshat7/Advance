const passport=require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const crypto=require('crypto');
const User=require("../models/user");

passport.use(new GoogleStrategy({
    clientID:     "275193763377-58g3kb5evbskqr356kg6iv3ogne992pt.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
  },
  function( accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.email[0].value }).exec(function(err,user){
        if(err){
            console.log('Error in googleStrategy');
            return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);
        if(user){
            return done(null,user);
        }else{
            user.create({name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('Error in showing detail');
                    return;
                }
                return done(null,user);
            })
        } 
    });
  }
));


module.exports=passport;