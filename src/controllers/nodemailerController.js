const nodemailer = require("nodemailer");
const { EMAIL_SERVER, EMAIL_USER, EMAIL_PASS, EMAIL_PORT, EMAIL_NAME } = require('../path');

module.exports = {
    sendEmail(dest_email, subject_email, message_email){
        let transporter = nodemailer.createTransport({
            /*host: EMAIL_SERVER,
            port: EMAIL_PORT,
            secure: false,*/
            service: 'gmail', 
            auth: {
              user: EMAIL_USER, 
              pass: EMAIL_PASS, 
            },
        });
        return new Promise((resolve, reject) => {
            let send = transporter.sendMail({
                from: EMAIL_NAME+' <'+EMAIL_USER+'>',
                to: dest_email,
                subject: subject_email, 
                text: message_email, 
                html: '<div style="background:black;color:white;text-align:center;"><h1>'+message_email+"</h1></div>"
            }, (error, info) => {
                if(error){
                    return reject(error);
                }
                return resolve(info);
            });
        });
    }
}