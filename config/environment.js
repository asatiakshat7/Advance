const development={
    name:'development',
    assets_path:'./assets',
    session_cookieKey:'blahsomething',
    db:'codeial_development',
    smtp:{
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'asatiakshat@gmail.com',
          pass: 'codingninjas'
        }
      },
     google_clientID: "275193763377-58g3kb5evbskqr356kg6iv3ogne992pt.apps.googleusercontent.com",
     google_clientSecret: "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",
     google_callbackURL: "http://localhost:8000/users/auth/google/callback",
     jwt_secret:'Codeial'

} 
const production={
    name:'Production'
}

module.exports=development;