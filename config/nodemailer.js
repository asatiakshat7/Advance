const nodemailer = require("nodemailer");
const ejs = require('ejs');
const env=require('./environment');
const path = require('path')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    logger:true,
    debug:true,
    secureConnection:false,
    auth: {
        user: "asatiakshat7@gmail.com",   //'alchemy.cn18',
        pass:  "cudm wcta cnab jvpg"
    },
    tls:{
      rejectUnauthorized:true
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) { console.log('error in rendering template', err); return }

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
// const nodemailer = require("nodemailer");
// const env=require('./environment');
// const ejs=require("ejs");
// const path=require('path');


// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//    host: 'smtp.gmail.com',
//    port: 465,
//    secure: true,
//    auth: {
//     user: 'asatiakshat7@gmail.com',
//     pass: '@a200386',
//    },(err, info) => {
//     if (err) {
//         console.log('Error in sending mail', err);
//         return;
//     }
//     return ;
//   }
//     // service:"gmail",
//     // host: "smtp.gmail.com",
//     // port: 465,
//     // secure: false,
//     // auth: {
//     //   // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     //   user: 'asatiakshat7@gmail.com',
//     //   pass: '@a200386'
//     // }
//   });

//   let renderTemplate=(data,relativePath)=>{
//     let mainHtml;
//     ejs.renderFile(
//         path.join(__dirname,'../views/mailers',relativePath),
//         data,
//         function(err,template){
//             if(err){
//                 console.log('error in render template');
//                 return ;
//             }
//             mainHtml=template;
//         }
//     )
//     return mainHtml;
//   }

//   module.exports={
//     transporter:transporter,
//     renderTemplate:renderTemplate
//   }

// // const nodemailer = require("nodemailer");
// // const ejs = require('ejs');
// // const path = require('path')


// // let transporter = nodemailer.createTransport({
// //     service: 'gmail',
// //     host: 'smtp.gmail.com',
// //     port: 587,
// //     secure: false,
// //     auth: {
// //         user: 'alchemy.cn18',
// //         pass: 'codingninjas'
// //     }
// // });


// // let renderTemplate = (data, relativePath) => {
// //     let mailHTML;
// //     ejs.renderFile(
// //         path.join(__dirname, '../views/mailers', relativePath),
// //         data,
// //         function(err, template){
// //          if (err){console.log('error in rendering template', err); return}
         
// //          mailHTML = template;
// //         }
// //     )

// //     return mailHTML;
// // }


// // module.exports = {
// //     transporter: transporter,
// //     renderTemplate: renderTemplate
// // }